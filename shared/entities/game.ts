import { oppositeSides } from '#constants';
import { GameSide, IAllowedStepsMap, IGameConfig, IGameSnapshot, IMove, IStep, ITable, IUnit, StepType } from '#interfaces';
import { generateInitialUnits, samePos } from '#utils';
import { createTable } from './tables';
import { Unit } from './unit';
import { UnitsController } from './units-controller';

type ConstructorData = {
  config: IGameConfig,
  turnOf: GameSide,
  table: ITable,
  units: IUnit[],
  lockedUnit?: IUnit,
};

type CreateData = {
  config: IGameConfig;
};

export class Game {
  private _winnerSide?: GameSide;
  public get winnerSide(): GameSide | undefined { return this._winnerSide; }

  private _turnOf: GameSide;
  public get turnOf(): GameSide { return this._turnOf; }

  private config: IGameConfig;
  /**
   * Ставится если включены множественные атаки и после
   * хода-атаки у юнита есть доступные ходы-атаки.
   */
  private lockedUnit?: Unit;

  private table: ITable;
  private unitsController: UnitsController;

  private constructor(data: ConstructorData) {
    const { config, turnOf, table, units, lockedUnit } = data;

    this.config = config;
    this._turnOf = turnOf;
    this.table = table;
    this.unitsController = new UnitsController(units);
    this.lockedUnit = lockedUnit && new Unit(lockedUnit);
  }

  public static createNew(data: CreateData): Game {
    const { config } = data;
    const table = createTable(config.tableType);
    const units = generateInitialUnits(table);

    return new Game({
      config,
      turnOf: GameSide.Bottom,
      table,
      units,
    });
  }

  public static load(snapshot: IGameSnapshot): Game {
    const { config, turnOf, units, lockedUnit } = snapshot;
    const table = createTable(config.tableType);

    return new Game({
      config,
      turnOf,
      table,
      units,
      lockedUnit,
    });
  }

  public snapshot(): IGameSnapshot {
    const { config, turnOf, unitsController, lockedUnit } = this;
    const units = unitsController.list();
    return {
      config,
      turnOf,
      units,
      lockedUnit,
    };
  }

  public findAvailableSteps(side: GameSide = this.turnOf): IAllowedStepsMap {
    const { lockedUnit, config } = this;

    if (config.multipleAttacks && lockedUnit) {
      // Ищем ходы только для lockedUnit'a.
      // Поиск ходов для другой стороны не должен ограничиваться этим юнитом
      if (lockedUnit.side === side) {
        return {
          [lockedUnit.id]: this.findAttackSteps(lockedUnit),
        };
      }
    }

    const unitsOfSide = this.unitsController.list(side);

    // Составляем список доступных атак для юнитов
    const attackStepsMap: IAllowedStepsMap = {};
    unitsOfSide.forEach((unit) => {
      const attackSteps = this.findAttackSteps(unit);
      const hasAttackSteps = attackSteps.length > 0;

      if (hasAttackSteps) {
        attackStepsMap[unit.id] = attackSteps;
      }
    });

    const someUnitCanAttack = Object.values(attackStepsMap).length > 0;

    if (config.mustBeat && someUnitCanAttack) {
      return attackStepsMap;
    } else {
      // Добавляем доступные перемещения к найденным ранее атакам.
      // Если доступных атак не было, просто ставим доступные перемещения
      const allStepsMap: IAllowedStepsMap = { ...attackStepsMap };
      unitsOfSide.forEach((unit) => {
        const moveSteps = this.findMoveSteps(unit);
        const hasMoveSteps = moveSteps.length > 0;

        if (hasMoveSteps) {
          const existingSteps = allStepsMap[unit.id] ?? [];
          allStepsMap[unit.id] = existingSteps.concat(moveSteps);
        }
      });

      return allStepsMap;
    }
  }

  public moveUnit(move: IMove): boolean {
    const { from, to } = move;

    const destinationOutside = this.table.isOutside(to);
    if (destinationOutside) {
      return false;
    }

    const selectedUnit = this.unitsController.unitOn(from);
    if (!selectedUnit) {
      return false;
    }

    const invalidSide = selectedUnit.side !== this.turnOf;
    if (invalidSide) {
      return false;
    }

    const availableStepsMap = this.findAvailableSteps(selectedUnit.side);
    const availableStepsOfUnit = availableStepsMap[selectedUnit.id];
    if (!availableStepsOfUnit) {
      return false;
    }

    const selectedStep = availableStepsOfUnit
      .find(step => samePos(step.destination, to));
    const stepUnavailable = !selectedStep;
    if (stepUnavailable) {
      return false;
    }

    this.applyStep(selectedStep, selectedUnit);

    return true;
  }

  private applyStep(step: IStep, unit: Unit): void {
    const { type, destination } = step;

    unit.position = destination; // перемещаем юнита

    const movedToUpgradeZone = this.table.isUpgradeZone(destination, unit.side);
    if (movedToUpgradeZone) { // улучшаем юнита если добрался до зоны улучшения
      unit.upgrade();
    }

    if (type === StepType.Attack) { // ход - атака
      const { config, unitsController } = this;

      step.affectedUnits.forEach(unit => { // удаляем убитых юнитов
        unitsController.kill(unit.id);
      });

      const availableAttacks = this.findAttackSteps(unit);
      const unitHasAvailableAttacks = availableAttacks.length > 0;
      if (config.multipleAttacks && unitHasAvailableAttacks) {
        this.lockedUnit = unit;
      } else {
        this.finishTurn();
      }
    }

    if (type === StepType.Move) {
      this.finishTurn();
    }
  }

  private finishTurn(): void {
    const { turnOf: currentSide } = this;

    const nextSide = oppositeSides[currentSide];

    this.lockedUnit = undefined;
    this._turnOf = nextSide;

    const nextSideUnits = this.unitsController.list(nextSide);
    const nextSideHasUnits = nextSideUnits.length > 0;

    const nextSideStepsMap = this.findAvailableSteps(nextSide);
    const nextSideHasAvailableSteps = Object.values(nextSideStepsMap).length > 0;

    if (!nextSideHasUnits || !nextSideHasAvailableSteps) {
      this._winnerSide = currentSide;
    }
  }

  private findAttackSteps(unit: Unit): IStep.Attack[] {
    const [x0, y0] = unit.position;

    const attackSteps: IStep.Attack[] = [];

    for (const direction of unit.attackDirections) {
      const [xV, yV] = direction;

      for (let i = 1; i <= unit.maxMoveDistance; i++) {
        const x = x0 + xV * i;
        const y = y0 + yV * i;

        const currentPos = [x, y];
        const nextPos = [x + xV, y + yV];

        const currentPositionOutsideOfMap = this.table.isOutside(currentPos);
        const nextPositionOutsideOfMap = this.table.isOutside(nextPos);
        if (currentPositionOutsideOfMap || nextPositionOutsideOfMap) break;

        const currentUnit = this.unitsController.unitOn(currentPos);

        const positionIsEmpty = currentUnit === null;
        if (positionIsEmpty) continue;

        const metOwnUnit = currentUnit.side === unit.side;
        if (metOwnUnit) break;

        const nextUnit = this.unitsController.unitOn(nextPos);

        const nextPositionIsEmpty = nextUnit === null;
        if (nextPositionIsEmpty) {
          attackSteps.push({
            type: StepType.Attack,
            from: unit.position,
            destination: nextPos,
            affectedUnits: [currentUnit],
          });
        }
      }
    }

    return attackSteps;
  }

  private findMoveSteps(unit: Unit): IStep.Move[] {
    const [x0, y0] = unit.position;

    const moveSteps: IStep.Move[] = [];

    for (const direction of unit.moveDirections) {
      const [xV, yV] = direction;

      for (let i = 1; i <= unit.maxMoveDistance; i++) {
        const x = x0 + xV * i;
        const y = y0 + yV * i;

        const currentPos = [x, y];

        const currentPositionOutsideOfMap = this.table.isOutside(currentPos);
        if (currentPositionOutsideOfMap) break;

        const currentUnit = this.unitsController.unitOn(currentPos);

        const positionIsEmpty = currentUnit === null;
        if (!positionIsEmpty) break;

        moveSteps.push({
          type: StepType.Move,
          from: unit.position,
          destination: currentPos,
        });
      }
    }

    return moveSteps;
  }
}

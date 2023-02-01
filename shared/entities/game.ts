import { directionsMap, oppositeSides } from '#constants';
import { Direction, GameSide, IAllowedStepsMap, IGameConfig, IGameSnapshot, IMove, IStep, ITable, IUnit, StepType } from '#interfaces';
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

export class Game {
  private _winnerSide: GameSide | null = null;
  public get winnerSide() { return this._winnerSide; }

  private _turnOf: GameSide;
  public get turnOf(): GameSide { return this._turnOf; }

  public readonly config: Readonly<IGameConfig>;
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
    this.table = table; // table не создаётся здесь, так как он нужен в createNew
    this.unitsController = new UnitsController(units);
    this.lockedUnit = lockedUnit && new Unit(lockedUnit);

    if (!this.canPlay(turnOf)) {
      this._winnerSide = oppositeSides[turnOf];
    }
  }

  public static createNew(config: IGameConfig): Game {
    const table = createTable(config.tableType);
    const units = generateInitialUnits(table);

    return new Game({
      config,
      turnOf: GameSide.Bottom,
      table,
      units,
    });
  }

  public static load(snapshot: IGameSnapshot, config: IGameConfig): Game {
    const { turnOf, units, lockedUnit } = snapshot;
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
    const { turnOf, unitsController, lockedUnit } = this;
    const units = unitsController.list();
    return {
      turnOf,
      units,
      lockedUnit,
    };
  }

  public findAvailableSteps(side: GameSide = this.turnOf): IAllowedStepsMap {
    const { lockedUnit, config } = this;

    // Если есть заблокированный юнит, ищем ходы только для него
    // (если юнит не принадлежит переданной стороне, пропускаем это условие)
    if (config.multipleAttacks && lockedUnit && lockedUnit.side === side) {
      const steps: IStep[] = this.findAttackSteps(lockedUnit);

      if (!config.mustBeat) {
        const skipStep: IStep.Move = {
          from: lockedUnit.position,
          destination: lockedUnit.position,
          type: StepType.Move,
        };

        steps.push(skipStep);
      }

      return {
        [lockedUnit.id]: steps,
      };
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
    if (!availableStepsOfUnit?.length) {
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

    if (type === StepType.Attack) {
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

    if (!this.canPlay(nextSide)) {
      this._winnerSide = currentSide;
    }
  }

  private canPlay(side: GameSide): boolean {
    const units = this.unitsController.list(side);
    const hasUnits = units.length > 0;

    const stepsMap = this.findAvailableSteps(side);
    const hasAvailableSteps = Object.values(stepsMap).length > 0;

    return hasUnits && hasAvailableSteps;
  }

  private findAttackSteps(unit: Unit): IStep.Attack[] {
    const [x0, y0] = unit.position;

    const attackSteps: IStep.Attack[] = [];

    const directionLimitsMap = this.config.moveSettings[unit.side][unit.type][StepType.Attack];

    for (const key in directionLimitsMap) {
      const directionKey = key as Direction;

      const maxDistance = directionLimitsMap[directionKey] ?? 0;
      const [xV, yV] = directionsMap[directionKey];

      for (let i = 1; i <= maxDistance; i++) {
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

    const directionLimitsMap = this.config.moveSettings[unit.side][unit.type][StepType.Move];

    for (const key in directionLimitsMap) {
      const directionKey = key as Direction;

      const maxDistance = directionLimitsMap[directionKey] ?? 0;
      const [xV, yV] = directionsMap[directionKey];

      for (let i = 1; i <= maxDistance; i++) {
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

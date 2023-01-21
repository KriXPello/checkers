import { directions } from '#constants';
import { Direction, GameSide, IUnit, Position, StepType, UnitType } from '#interfaces';

export class Unit implements IUnit {
  public id: IUnit['id'];
  public side: GameSide;
  public type: UnitType;
  public position: Position;

  constructor(data: IUnit) {
    const { id, side, type, position } = data;
    this.id = id;
    this.side = side;
    this.type = type;
    this.position = position;
  }

  public get maxMoveDistance(): number {
    return maxMoveDistance[this.type];
  }

  public get moveDirections(): Direction[] {
    const { side, type } = this;
    return stepDirections[side][type][StepType.Move];
  }

  public get attackDirections(): Direction[] {
    const { side, type } = this;
    return stepDirections[side][type][StepType.Attack];
  }

  public upgrade() {
    if (this.type === UnitType.Basic) {
      this.type = UnitType.Special;
    }
  }

  public cut(): IUnit {
    const { id, side, type, position } = this;

    return {
      id,
      side,
      type,
      position
    };
  }
}

const maxMoveDistance: Record<UnitType, number> = {
  [UnitType.Basic]: 1,
  [UnitType.Special]: Infinity,
};

type Directions = Record<
  GameSide,
  Record<
    UnitType,
    Record<StepType, Direction[]>
  >
>;

const stepDirections: Directions = {
  [GameSide.Bottom]: {
    [UnitType.Basic]: {
      [StepType.Move]: [
        directions.top,
        directions.topLeft,
        directions.topRight,
      ],
      [StepType.Attack]: directions.diagonalArr,
    },
    [UnitType.Special]: {
      [StepType.Move]: [
        directions.top,
        directions.bottom,
        ...directions.diagonalArr,
      ],
      [StepType.Attack]: directions.diagonalArr,
    },
  },
  [GameSide.Top]: {
    [UnitType.Basic]: {
      [StepType.Move]: [
        directions.bottom,
        directions.bottomLeft,
        directions.bottomRight,
      ],
      [StepType.Attack]: directions.diagonalArr,
    },
    [UnitType.Special]: {
      [StepType.Move]: [
        directions.top,
        directions.bottom,
        ...directions.diagonalArr,
      ],
      [StepType.Attack]: directions.diagonalArr,
    },
  },
};

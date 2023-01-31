import { GameSide, IUnit, Position, UnitType } from '#interfaces';

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

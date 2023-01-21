import { GameSide, IUnit, Position } from '#interfaces';
import { ObjectSet } from '#utils';
import { Unit } from './unit';

export class UnitsController {
  private units: ObjectSet<Unit>;

  constructor(units: IUnit[]) {
    this.units = new ObjectSet<Unit>(
      units.map(unit => new Unit(unit))
    );
  }

  public unitOn(position: Position): Unit | null {
    const [x0, y0] = position;

    const unit = this.units.elements.find((unit) => {
      const [x, y] = unit.position;
      return x0 === x && y0 === y;
    });

    return unit ?? null;
  }

  public kill(id: string): Unit | null {
    const removedUnit = this.units.remove(id);
    return removedUnit;
  }

  public list(side?: GameSide): Unit[] {
    const { elements: unitsList } = this.units;

    if (side !== undefined) {
      return unitsList.filter(unit => unit.side === side);
    }

    return unitsList;
  }
}

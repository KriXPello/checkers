import { GameSide, ITable, Position, TableType } from '#interfaces';

export class BasicTable implements ITable {
  public readonly type = TableType.Basic;
  public readonly height = 6;
  public readonly width = 6;

  public isOutside(pos: Position): boolean {
    const { width, height } = this;
    const [x, y] = pos;

    return [
      x < 0,
      y < 0,
      x > width - 1,
      y > height - 1,
    ].some(Boolean);
  }

  public isUpgradeZone(pos: Position, forSide: GameSide): boolean {
    const { height } = this;
    const [, y] = pos;
    if (forSide === GameSide.Top) {
      return y === height - 1;
    }

    if (forSide === GameSide.Bottom) {
      return y === 0;
    }

    return false;
  }
}

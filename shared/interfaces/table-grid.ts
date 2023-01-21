import { IUnit } from './unit';

export enum CellType {
  Void = 'void',
  Basic = 'basic',
}

export type IGridElem = {
  cellType: CellType,
  unit: IUnit | null,
};

/**
 * y - вниз
 * x - вправо
 *
 * обращаться: grid[x][y]
 */
export type ITableGrid = IGridElem[][];

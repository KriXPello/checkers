export type ObjectWithId = {
  id: string,
  [key: string]: any,
};

/** [x, y] */
export type Position = number[];

/**
 * Вектор, обозначающий направление. Примеры:
 * [-1, -1] - влево вниз
 * [1, 0] - вправо
 * [0, 1] - вверх
 */
export type Direction = number[];

export interface IMove {
  from: Position,
  to: Position,
}

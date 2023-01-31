export type ObjectWithId = {
  id: string,
  [key: string]: any,
};

/** [x, y] */
export type Position = number[];

export interface IMove {
  from: Position,
  to: Position,
}

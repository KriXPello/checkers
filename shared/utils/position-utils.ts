import { Position } from '#interfaces';

export const samePos = (pos1: Position, pos2: Position) => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

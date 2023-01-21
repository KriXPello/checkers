import { GameSide } from '#interfaces';

export const oppositeSides: Record<GameSide, GameSide> = {
  [GameSide.Bottom]: GameSide.Top,
  [GameSide.Top]: GameSide.Bottom,
};

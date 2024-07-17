import { GameSide } from '~/entities';

export const unitColors: Record<GameSide, string> = {
  [GameSide.Top]: '#4C5786',
  [GameSide.Bottom]: '#ff715b',
};

export const specialUnitMarkColors: Record<GameSide, string> = {
  [GameSide.Top]: '#f2f7f2',
  [GameSide.Bottom]: '#f2f7f2',
};

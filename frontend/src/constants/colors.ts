import { GameSide, StepType } from '#interfaces';

export const unitColors: Record<GameSide, string> = {
  [GameSide.Top]: '#EF7562',
  [GameSide.Bottom]: '#445E93',
};

export const specialUnitMarkColors: Record<GameSide, string> = {
  [GameSide.Top]: '#000000',
  [GameSide.Bottom]: '#FFFFFF',
};

export const stepColors: Record<StepType, string> = {
  [StepType.Move]: '#4D8B31',
  [StepType.Attack]: '#D72638',
};

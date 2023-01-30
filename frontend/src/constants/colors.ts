import { GameSide, StepType } from '#interfaces';

export const unitColors: Record<GameSide, string> = {
  [GameSide.Top]: '#445E93',
  [GameSide.Bottom]: '#EF7562',
};

export const specialUnitMarkColors: Record<GameSide, string> = {
  [GameSide.Top]: '#FFFFFF',
  [GameSide.Bottom]: '#000000',
};

export const stepColors: Record<StepType, string> = {
  [StepType.Move]: '#4D8B31',
  [StepType.Attack]: '#D72638',
};

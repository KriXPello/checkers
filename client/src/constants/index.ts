import { GameSide, StepType } from '~/entities';

export const unitColors: Record<GameSide, string> = {
  [GameSide.Top]: '#4C5786',
  [GameSide.Bottom]: '#ff715b',
};

export const specialUnitMarkColors: Record<GameSide, string> = {
  [GameSide.Top]: '#f2f7f2',
  [GameSide.Bottom]: '#f2f7f2',
};

export const stepColors: Record<StepType, string> = {
  [StepType.Move]: '#4D8B31',
  [StepType.Attack]: '#D72638',
};

export const stepIconColors: Record<StepType, string> = {
  [StepType.Move]: '#FFFFFF',
  [StepType.Attack]: '#FFFFFF',
};

export enum RouteName {
  Home = 'home',
  CreateGame = 'create-game',
}

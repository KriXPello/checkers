import { IMoveSettings, Direction, GameSide, UnitType, StepType } from '#interfaces';

export const directionsMap: Record<Direction, number[]> = {
  [Direction.TopLeft]: [-1, -1],
  [Direction.Top]: [0, -1],
  [Direction.TopRight]: [1, -1],
  [Direction.Right]: [1, 0],
  [Direction.BottomRight]: [1, 1],
  [Direction.Bottom]: [0, 1],
  [Direction.BottomLeft]: [-1, 1],
  [Direction.Left]: [-1, 0],
};

export const maxStepDistance = 20;

export const defaultMoveSettings = (): IMoveSettings => {
  return {
    [GameSide.Top]: {
      [UnitType.Basic]: {
        [StepType.Move]: {
          [Direction.BottomRight]: 1,
          [Direction.Bottom]: 1,
          [Direction.BottomLeft]: 1,
        },
        [StepType.Attack]: {
          [Direction.TopLeft]: 1,
          [Direction.TopRight]: 1,
          [Direction.BottomRight]: 1,
          [Direction.BottomLeft]: 1,
        },
      },
      [UnitType.Special]: {
        [StepType.Move]: {
          [Direction.TopLeft]: maxStepDistance,
          [Direction.Top]: maxStepDistance,
          [Direction.TopRight]: maxStepDistance,
          [Direction.BottomRight]: maxStepDistance,
          [Direction.Bottom]: maxStepDistance,
          [Direction.BottomLeft]: maxStepDistance,
        },
        [StepType.Attack]: {
          [Direction.TopLeft]: maxStepDistance,
          [Direction.TopRight]: maxStepDistance,
          [Direction.BottomRight]: maxStepDistance,
          [Direction.BottomLeft]: maxStepDistance,
        },
      },
    },
    [GameSide.Bottom]: {
      [UnitType.Basic]: {
        [StepType.Move]: {
          [Direction.TopLeft]: 1,
          [Direction.Top]: 1,
          [Direction.TopRight]: 1,
        },
        [StepType.Attack]: {
          [Direction.TopLeft]: 1,
          [Direction.TopRight]: 1,
          [Direction.BottomRight]: 1,
          [Direction.BottomLeft]: 1,
        },
      },
      [UnitType.Special]: {
        [StepType.Move]: {
          [Direction.TopLeft]: maxStepDistance,
          [Direction.Top]: maxStepDistance,
          [Direction.TopRight]: maxStepDistance,
          [Direction.BottomRight]: maxStepDistance,
          [Direction.Bottom]: maxStepDistance,
          [Direction.BottomLeft]: maxStepDistance,
        },
        [StepType.Attack]: {
          [Direction.TopLeft]: maxStepDistance,
          [Direction.TopRight]: maxStepDistance,
          [Direction.BottomRight]: maxStepDistance,
          [Direction.BottomLeft]: maxStepDistance,
        },
      },
    }
  };
};

import { GameSide, UnitType, StepType, Direction, IMoveSettings, IUnit, IPosition } from '~/entities';

export function defaultMoveSettings(maxStepDistance: number): IMoveSettings {
  return {
    [GameSide.Top]: {
      [UnitType.Basic]: {
        [StepType.Move]: {
          [Direction.BottomRight]: 1,
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
          [Direction.TopRight]: maxStepDistance,
          [Direction.BottomRight]: maxStepDistance,
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
          [Direction.TopRight]: maxStepDistance,
          [Direction.BottomRight]: maxStepDistance,
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

export function randomString() {
  return Math.floor(Date.now() * Math.random()).toString(16);
}

function makeBasicUnit(position: IPosition, side: GameSide): IUnit {
  return {
    id: randomString(),
    side,
    type: UnitType.Basic,
    position,
  };
};

/**
 * Стандартное размещение фигур сверху и снизу, как в привычных шашках.
 * В центре всегда минимум 2 линии пустые, поэтому минимальная высота поля = 4
 */
export const generateInitialUnits = (sizeX: number, sizeY: number): IUnit[] => {
  const units: IUnit[] = [];

  const requiredFreeSpace = 2;
  const rowsPerSide = Math.floor((sizeY - requiredFreeSpace) / 2);

  // верхние фигуры
  for (let y = 0; y < rowsPerSide; y++) {
    for (let x = y % 2; x < sizeX; x += 2) {
      const newUnit = makeBasicUnit({ x, y }, GameSide.Top);
      units.push(newUnit);
    }
  }

  // нижние фигуры
  for (let padY = 0; padY < rowsPerSide; padY++) {
    const y = sizeY - padY - 1;
    for (let x = y % 2; x < sizeX; x += 2) {
      const newUnit = makeBasicUnit({ x, y }, GameSide.Bottom);
      units.push(newUnit);
    }
  }

  return units;
};

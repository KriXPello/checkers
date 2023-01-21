import { getUniqueString } from '#utils';
import { GameSide, ITable, IUnit, Position, UnitType } from '#interfaces';

const makeBasicUnit = (position: Position, side: GameSide): IUnit => {
  return {
    id: getUniqueString(),
    side,
    type: UnitType.Basic,
    position,
  };
};

// TODO: Разная генерация для разных карт
export const generateInitialUnits = (table: ITable): IUnit[] => {
  const { width, height } = table;
  const units: IUnit[] = [];

  const rowsPerSide = 2;

  // top units
  for (let y = 0; y < rowsPerSide; y++) {
    for (let x = y % 2; x < width; x += 2) {
      const newUnit = makeBasicUnit([x, y], GameSide.Top);
      units.push(newUnit);
    }
  }

  // bottom units
  for (let padY = 0; padY < rowsPerSide; padY++) {
    const y = height - padY - 1;
    for (let x = y % 2; x < width; x += 2) {
      const newUnit = makeBasicUnit([x, y], GameSide.Bottom);
      units.push(newUnit);
    }
  }

  return units;
};

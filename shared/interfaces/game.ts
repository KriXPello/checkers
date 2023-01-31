import { StepType } from './step';
import { TableType } from './table';
import { IUnit, UnitType } from './unit';

export enum GameSide {
  Top = 'top',
  Bottom = 'bottom',
}

export enum Direction {
  TopLeft = 'topLeft',
  Top = 'top',
  TopRight = 'topRight',
  Right = 'right',
  BottomRight = 'bottomRight',
  Bottom = 'bottom',
  BottomLeft = 'bottomLeft',
  Left = 'left',
}

export type IDirectionsLimitsMap = {
  [D in Direction]?: number;
};

export type IMoveSettings = {
  [Side in GameSide]: {
    [UType in UnitType]: {
      [SType in StepType]: IDirectionsLimitsMap;
    }
  }
};

export interface IGameConfig {
  tableType: TableType,
  mustBeat: boolean,
  multipleAttacks: boolean,
  moveSettings: IMoveSettings,
}

export interface IGameSnapshot {
  turnOf: GameSide,
  units: IUnit[],
  lockedUnit?: IUnit,
}

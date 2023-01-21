import { TableType } from './table';
import { IUnit } from './unit';

export enum GameSide {
  Top = 'top',
  Bottom = 'bottom',
}

export interface IGameConfig {
  tableType: TableType,
  mustBeat: boolean,
  multipleAttacks: boolean,
}

export interface IGameSnapshot {
  config: IGameConfig,
  turnOf: GameSide,
  units: IUnit[],
  lockedUnit?: IUnit,
}

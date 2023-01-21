import { GameSide } from './game';
import { Position } from './helpers';

export enum TableType {
  Basic = 'basic',
  Another = 'another',
}

export interface ITable {
  readonly type: TableType,
  readonly width: number,
  readonly height: number,
  isOutside(pos: Position): boolean,
  isUpgradeZone(pos: Position, forSide: GameSide): boolean,
}

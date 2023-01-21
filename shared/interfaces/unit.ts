import { GameSide } from './game';
import { Position } from './helpers';

export enum UnitType {
  Basic = 'basic',
  Special = 'special',
}

export interface IUnit {
  id: string,
  side: GameSide,
  type: UnitType,
  position: Position,
}

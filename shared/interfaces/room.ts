import { GameSide, IGameSnapshot } from './game';
import { IUser } from './user';

export enum RoleInRoom {
  Player = 'player',
  Spectator = 'spectator',
}

export type IActors = Record<GameSide, IUser | undefined>;

export interface IRoomBaseInfo {
  id: string,
  title: string,
  isSecured: boolean,
}

export interface IRoomShortInfo extends IRoomBaseInfo {
  playersCount: number,
}

export interface IRoomFullInfo extends IRoomBaseInfo {
  actors: IActors,
  gameSnapshot: IGameSnapshot,
}

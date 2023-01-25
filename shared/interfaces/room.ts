import { GameSide, IGameSnapshot } from './game';
import { IUser } from './user';

export type IActors = Record<GameSide, IUser | null>;

export interface IRoomBaseInfo {
  id: string,
  title: string,
  isSecured: boolean,
}

export interface IRoomShortInfo extends IRoomBaseInfo {
  playersCount: number,
}

export interface IRoomFullInfo extends IRoomBaseInfo {
  creatorId: string,
  actors: IActors,
  gameSnapshot: IGameSnapshot,
}

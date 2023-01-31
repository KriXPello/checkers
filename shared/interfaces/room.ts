import { GameSide, IGameConfig, IGameSnapshot } from './game';
import { IUser } from './user';

export type IActors = Record<GameSide, IUser | null>;

export interface IRoomBaseInfo {
  id: string,
  title: string,
  isSecured: boolean,
}

export interface IRoomState {
  started: boolean,
  actors: IActors,
  gameSnapshot: IGameSnapshot,
  winner?: IUser,
}

export interface IRoomShortInfo extends IRoomBaseInfo {
  id: string,
  title: string,
  isSecured: boolean,
  playersCount: number,
}

export interface IRoomFullInfo extends IRoomBaseInfo, IRoomState {
  creatorId: string,
  gameConfig: IGameConfig,
}

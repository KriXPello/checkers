import { IUser } from '../user';
import { IRoomFullInfo, IRoomState } from '../room';

export enum ServerMessageType {
  UserData = 'userData',
  RoomState = 'roomState',
  GameRestart = 'gameRestart',
  RoomDeleted = 'roomDeleted',
}

export namespace IServerMessageData {
  export interface UserData {
    userData: IUser,
  }

  export interface RoomState {
    roomState: IRoomState,
  }

  export interface GameRestart {
    roomFullInfo: IRoomFullInfo,
  }

  export interface RoomDeleted {
    roomId: string,
  }
}

export type IServerMessageDataMap = {
  [ServerMessageType.UserData]: IServerMessageData.UserData,
  [ServerMessageType.RoomState]: IServerMessageData.RoomState,
  [ServerMessageType.GameRestart]: IServerMessageData.GameRestart,
  [ServerMessageType.RoomDeleted]: IServerMessageData.RoomDeleted,
};

type IServerMessageMap = { [T in ServerMessageType]: { type: T, data: IServerMessageDataMap[T]; } };

export type IServerMessage = IServerMessageMap[keyof IServerMessageMap];

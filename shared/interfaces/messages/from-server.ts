import { IUser } from '../user';
import { IRoomFullInfo } from '../room';

export enum ServerMessageType {
  UserData = 'userData',
  RoomData = 'roomData',
  GameOver = 'gameOver',
  RoomDeleted = 'roomDeleted',
}

export namespace IServerMessageData {
  export interface UserData {
    userData: IUser,
  }

  export interface RoomData {
    roomFullInfo: IRoomFullInfo,
  }

  export interface GameOver {
    winner: IUser,
    roomId: string,
  }

  export interface RoomDeleted {
    roomId: string,
  }
}

export type IServerMessageDataMap = {
  [ServerMessageType.UserData]: IServerMessageData.UserData,
  [ServerMessageType.RoomData]: IServerMessageData.RoomData,
  [ServerMessageType.GameOver]: IServerMessageData.GameOver,
  [ServerMessageType.RoomDeleted]: IServerMessageData.RoomDeleted,
};

type IServerMessageMap = { [T in ServerMessageType]: { type: T, data: IServerMessageDataMap[T]; } };

export type IServerMessage = IServerMessageMap[keyof IServerMessageMap];

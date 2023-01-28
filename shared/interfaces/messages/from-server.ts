import { IUser } from '../user';
import { IRoomFullInfo } from '../room';

export enum ServerMessageType {
  UserData = 'userData',
  RoomData = 'roomData',
  GameOver = 'gameOver',
  CreatorLeft = 'creatorLeft',
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

  export interface CreatorLeft {

  }
}

export type IServerMessageDataMap = {
  [ServerMessageType.UserData]: IServerMessageData.UserData,
  [ServerMessageType.RoomData]: IServerMessageData.RoomData,
  [ServerMessageType.GameOver]: IServerMessageData.GameOver,
  [ServerMessageType.CreatorLeft]: IServerMessageData.CreatorLeft,
};

type IServerMessageMap = { [T in ServerMessageType]: { type: T, data: IServerMessageDataMap[T]; } };

export type IServerMessage = IServerMessageMap[keyof IServerMessageMap];

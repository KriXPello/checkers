import { IUser } from '../user';
import { IRoomFullInfo, IRoomShortInfo } from '../room';

type SM<T extends ServerMessageType, DataT extends Record<string, any>> = {
  type: T,
  data: DataT,
};

export type IServerMessageData =
  | IServerMessageData.RoomsList
  | IServerMessageData.UserData
  | IServerMessageData.RoomData
  | IServerMessageData.GameOver
  | ServerMessageType.Toast;

export type IServerMessage =
  | SM<ServerMessageType.RoomsList, IServerMessageData.RoomsList>
  | SM<ServerMessageType.UserData, IServerMessageData.UserData>
  | SM<ServerMessageType.RoomData, IServerMessageData.RoomData>
  | SM<ServerMessageType.GameOver, IServerMessageData.GameOver>
  | SM<ServerMessageType.Toast, IServerMessageData.Toast>;


export enum ServerMessageType {
  RoomsList = 'roomsList',
  UserData = 'userData',
  RoomData = 'roomData',
  GameOver = 'gameOver',
  Toast = 'toast',
}

export enum ToastLevel {
  Light = 'light',
  Success = 'success',
  Info = 'info',
}

export namespace IServerMessageData {
  export interface RoomsList {
    rooms: IRoomShortInfo[],
  }

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

  export interface Toast {
    level: ToastLevel,
    headerText?: string,
    bodyText?: string,
  }
}

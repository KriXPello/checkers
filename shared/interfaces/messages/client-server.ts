import { IRoomFullInfo, RoleInRoom } from '#interfaces';
import { IMove } from '../helpers';

export enum ClientMessageType {
  LogIn = 'LogIn',
  CreateRoom = 'createRoom',
  JoinRoom = 'joinRoom',
  MakeStep = 'makeStep',
}

type CM<T extends ClientMessageType, DataT extends Record<string, any>> = {
  type: T,
  data: DataT,
};

export namespace IClientMessageData {
  export interface LogIn {
    name: string,
  }

  export interface CreateRoom {
    title: string,
    password?: string,
  }

  export interface JoinRoom {
    roomId: string,
    joinAs: RoleInRoom,
    password?: string,
  }

  export interface MakeStep {
    roomId: string,
    move: IMove;
  }
}

export type IClientMessage =
  | CM<ClientMessageType.LogIn, IClientMessageData.LogIn>
  | CM<ClientMessageType.CreateRoom, IClientMessageData.CreateRoom>
  | CM<ClientMessageType.JoinRoom, IClientMessageData.JoinRoom>
  | CM<ClientMessageType.MakeStep, IClientMessageData.MakeStep>;

export namespace IServerResponse {
  export interface LogIn {
    token: string,
  }

  export interface CreateRoom {
    roomInfo: IRoomFullInfo,
  }
}

export type IClientMessageDataMap = {
  [ClientMessageType.LogIn]: IClientMessageData.LogIn,
  [ClientMessageType.CreateRoom]: IClientMessageData.CreateRoom,
  [ClientMessageType.JoinRoom]: {},
  [ClientMessageType.MakeStep]: {},
};

export type IServerResponseMap = {
  [ClientMessageType.LogIn]: IServerResponse.LogIn,
  [ClientMessageType.CreateRoom]: IServerResponse.CreateRoom,
  [ClientMessageType.JoinRoom]: {},
  [ClientMessageType.MakeStep]: {},
};

export type IClientMessageData = IClientMessageDataMap[keyof IClientMessageDataMap];
export type IServerResponse = IServerResponseMap[keyof IServerResponseMap];

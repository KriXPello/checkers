import { IRoomFullInfo, IRoomShortInfo } from '#interfaces';
import { IMove } from '../helpers';

export enum ClientMessageType {
  LogIn = 'LogIn',
  CheckToken = 'CheckToken',
  CreateRoom = 'CreateRoom',
  GetRooms = 'GetRooms',
  JoinRoom = 'JoinRoom',
  LeaveRoom = 'LeaveRoom',
  SwapPlayers = 'SwapPlayers',
  MakeStep = 'MakeStep',
}

export namespace IClientMessageData {
  export interface LogIn {
    name: string,
  }

  export interface CheckToken {
    token: string,
  }

  export interface CreateRoom {
    title: string,
    password?: string,
  }

  export interface GetRooms {

  }

  export interface JoinRoom {
    roomId: string,
    password?: string,
  }

  export interface LeaveRoom {
    roomId: string,
  }

  export interface SwapPlayers {
    roomId: string,
  }

  export interface MakeStep {
    roomId: string,
    move: IMove;
  }
}

export type IClientMessageDataMap = {
  [ClientMessageType.LogIn]: IClientMessageData.LogIn,
  [ClientMessageType.CheckToken]: IClientMessageData.CheckToken,
  [ClientMessageType.CreateRoom]: IClientMessageData.CreateRoom,
  [ClientMessageType.GetRooms]: IClientMessageData.GetRooms,
  [ClientMessageType.JoinRoom]: IClientMessageData.JoinRoom,
  [ClientMessageType.LeaveRoom]: IClientMessageData.LeaveRoom,
  [ClientMessageType.SwapPlayers]: IClientMessageData.SwapPlayers,
  [ClientMessageType.MakeStep]: IClientMessageData.MakeStep,
};

export type IClientMessage<T extends ClientMessageType = ClientMessageType> = {
  type: T,
  data: IClientMessageDataMap[T];
};

export namespace IServerResponse {
  export interface LogIn {
    id: string,
    token: string,
    name: string,
  }

  export type CheckToken = {
    valid: false,
  } | {
    valid: true,
    id: string,
    name: string,
    activeRoom?: IRoomFullInfo,
  };

  export interface CreateRoom {
    roomInfo: IRoomFullInfo,
  }

  export interface GetRooms {
    rooms: IRoomShortInfo[],
  }

  export type JoinRoom = {
    joined: false,
    reason: string,
  } | {
    joined: true,
    roomInfo: IRoomFullInfo,
  };

  export type LeaveRoom = {
    leaved: boolean,
  };

  export interface SwapPlayers {
    swapped: boolean,
  }

  export interface MakeStep {
    success: boolean,
  }
}

export type IServerResponseMap = {
  [ClientMessageType.LogIn]: IServerResponse.LogIn,
  [ClientMessageType.CheckToken]: IServerResponse.CheckToken;
  [ClientMessageType.CreateRoom]: IServerResponse.CreateRoom,
  [ClientMessageType.GetRooms]: IServerResponse.GetRooms,
  [ClientMessageType.JoinRoom]: IServerResponse.JoinRoom,
  [ClientMessageType.LeaveRoom]: IServerResponse.LeaveRoom,
  [ClientMessageType.SwapPlayers]: IServerResponse.SwapPlayers,
  [ClientMessageType.MakeStep]: IServerResponse.MakeStep,
};

export type IServerResponse = IServerResponseMap[keyof IServerResponseMap];

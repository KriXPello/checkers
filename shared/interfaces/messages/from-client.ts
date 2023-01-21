import { RoleInRoom } from '#interfaces';
import { IMove } from '../helpers';

export enum ClientMessageType {
  ChangeName = 'changeName',
  CreateRoom = 'createRoom',
  JoinRoom = 'joinRoom',
  MakeStep = 'makeStep',
}

type CM<T extends ClientMessageType, DataT extends Record<string, any>> = {
  type: T,
  data: DataT,
};

export type IClientMessageData =
  | IClientMessageData.ChangeName
  | IClientMessageData.CreateRoom
  | IClientMessageData.JoinRoom
  | IClientMessageData.MakeStep;

export namespace IClientMessageData {
  export interface ChangeName {
    newName: string,
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
  | CM<ClientMessageType.ChangeName, IClientMessageData.ChangeName>
  | CM<ClientMessageType.CreateRoom, IClientMessageData.CreateRoom>
  | CM<ClientMessageType.JoinRoom, IClientMessageData.JoinRoom>
  | CM<ClientMessageType.MakeStep, IClientMessageData.MakeStep>;

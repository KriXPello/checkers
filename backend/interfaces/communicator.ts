import { IServerMessage } from '#interfaces';

export interface ISentMessage {
  receiverId: string,
  success: boolean,
  message: IServerMessage,
}

export interface ICommunicator {
  send(message: IServerMessage): Promise<ISentMessage>;
}

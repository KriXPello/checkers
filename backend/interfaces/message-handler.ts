import joi from 'joi';

import { ClientMessageType, IClientMessageDataMap, IServerResponse, IServerResponseMap } from '#interfaces';
import { User } from '../entities';

interface PayloadWithoutAuth<T extends ClientMessageType> {
  messageData: IClientMessageDataMap[T],
}

interface PayloadWithAuth<T extends ClientMessageType> {
  messageData: IClientMessageDataMap[T],
  sender: User,
}

type MessageHandler<P, R extends IServerResponse> = (params: P) => R | Promise<R>;

export type Handler<T extends ClientMessageType> = {
  noAuth: true,
  schema: joi.Schema<IClientMessageDataMap[T]>,
  callback: MessageHandler<PayloadWithoutAuth<T>, IServerResponseMap[T]>;
} | {
  noAuth?: false,
  schema: joi.Schema<IClientMessageDataMap[T]>,
  callback: MessageHandler<PayloadWithAuth<T>, IServerResponseMap[T]>;
};

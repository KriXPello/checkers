import joi from 'joi';

import { IClientMessageData } from '#interfaces';
import { ReadonlyObjectSet } from '#utils';
import { Room, User } from '../entities';

interface MessageHandlerPayload<T extends IClientMessageData = IClientMessageData> {
  messageData: T,
  sender: User,
  allUsersSet: ReadonlyObjectSet<User>,
  roomsSet: ReadonlyObjectSet<Room>,
}

type MessageHandler<T extends IClientMessageData = IClientMessageData>
  = (params: MessageHandlerPayload<T>) => any | Promise<any>;

export interface HandlerData<T extends IClientMessageData = IClientMessageData> {
  callback: MessageHandler<T>,
  schema: joi.Schema<T>,
}

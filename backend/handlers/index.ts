import { ClientMessageType } from '#interfaces';

import { changeName } from './change-name';
import { createRoom } from './create-room';
import { joinRoom } from './join-room';

import { HandlerData } from '../interfaces';
import { makeStep } from './make-step';

export const handlersMap: Record<ClientMessageType, HandlerData<any>> = {
  [ClientMessageType.ChangeName]: changeName,
  [ClientMessageType.CreateRoom]: createRoom,
  [ClientMessageType.JoinRoom]: joinRoom,
  [ClientMessageType.MakeStep]: makeStep,
};

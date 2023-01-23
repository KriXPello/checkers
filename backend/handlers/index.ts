import { ClientMessageType } from '#interfaces';

import { logIn } from './log-in';
// import { createRoom } from './create-room';
// import { joinRoom } from './join-room';

import { Handler } from '../interfaces';
// import { makeStep } from './make-step';

export const handlersMap: Record<ClientMessageType, Handler<any>> = {
  [ClientMessageType.LogIn]: logIn,
  // [ClientMessageType.CreateRoom]: createRoom,
  // [ClientMessageType.JoinRoom]: joinRoom,
  // [ClientMessageType.MakeStep]: makeStep,
  [ClientMessageType.CreateRoom]: {} as any,
  [ClientMessageType.JoinRoom]: {} as any,
  [ClientMessageType.MakeStep]: {} as any,
};

import { ClientMessageType } from '#interfaces';

import { logIn } from './log-in';
import { createRoom } from './create-room';
import { joinRoom } from './join-room';
import { swapPlayers } from './swap-players';
import { makeStep } from './make-step';

import { Handler } from '../interfaces';

export const handlersMap: Record<ClientMessageType, Handler<any>> = {
  [ClientMessageType.LogIn]: logIn,
  [ClientMessageType.CheckToken]: {} as any,
  [ClientMessageType.CreateRoom]: createRoom,
  [ClientMessageType.GetRooms]: {} as any,
  [ClientMessageType.JoinRoom]: joinRoom,
  [ClientMessageType.SwapPlayers]: swapPlayers,
  [ClientMessageType.MakeStep]: makeStep,
  [ClientMessageType.CreateRoom]: {} as any,
  [ClientMessageType.JoinRoom]: {} as any,
  [ClientMessageType.MakeStep]: {} as any,
};

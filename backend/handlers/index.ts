import { ClientMessageType } from '#interfaces';

import { checkToken } from './check-token';
import { createRoom } from './create-room';
import { getRooms } from './get-rooms';
import { joinRoom } from './join-room';
import { leaveRoom } from './leave-room';
import { logIn } from './log-in';
import { logOut } from './log-out';
import { makeStep } from './make-step';
import { restartGame } from './restart-game';
import { startGame } from './start-game';
import { swapPlayers } from './swap-players';

import { Handler } from '../interfaces';

export const handlersMap: Record<ClientMessageType, Handler<any>> = {
  [ClientMessageType.CheckToken]: checkToken,
  [ClientMessageType.CreateRoom]: createRoom,
  [ClientMessageType.GetRooms]: getRooms,
  [ClientMessageType.JoinRoom]: joinRoom,
  [ClientMessageType.LeaveRoom]: leaveRoom,
  [ClientMessageType.LogIn]: logIn,
  [ClientMessageType.LogOut]: logOut,
  [ClientMessageType.MakeStep]: makeStep,
  [ClientMessageType.RestartGame]: restartGame,
  [ClientMessageType.StartGame]: startGame,
  [ClientMessageType.SwapPlayers]: swapPlayers,
};

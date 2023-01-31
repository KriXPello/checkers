import joi from 'joi';

import { IClientMessageData, IMove } from '#interfaces';

export * from './complex';

const requiredString = joi.string().min(1).required();
const password = joi.string().allow('');

export const checkToken = joi.object<IClientMessageData.CheckToken>({
  token: requiredString,
});

export const getRooms = joi.object<IClientMessageData.GetRooms>({});

export const joinRoom = joi.object<IClientMessageData.JoinRoom>({
  roomId: requiredString,

  password,
});

export const leaveRoom = joi.object<IClientMessageData.LeaveRoom>({
  roomId: requiredString,
});

export const logIn = joi.object<IClientMessageData.LogIn>({
  name: requiredString,
});

export const restartGame = joi.object<IClientMessageData.RestartGame>({
  roomId: requiredString,
});

export const startGame = joi.object<IClientMessageData.StartGame>({
  roomId: requiredString,
});

// [number, number]
const position = joi
  .array()
  .items(joi.number().required(), joi.number().required())
  .required();

const move = joi.object<IMove>({
  from: position,
  to: position,
});

export const makeStep = joi.object<IClientMessageData.MakeStep>({
  roomId: requiredString,
  move,
});

export const swapPlayers = joi.object<IClientMessageData.SwapPlayers>({
  roomId: requiredString,
});

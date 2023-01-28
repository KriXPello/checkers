import joi from 'joi';

import { IClientMessageData, IMove } from '#interfaces';

const requiredString = joi.string().min(1).required();
const password = joi.string().allow('');

export const checkToken = joi.object<IClientMessageData.CheckToken>({
  token: requiredString,
});

export const createRoom = joi.object<IClientMessageData.CreateRoom>({
  title: joi
    .string()
    .min(1)
    .required(),

  password,
});

export const getRooms = joi.object<IClientMessageData.GetRooms>({});

export const joinRoom = joi.object<IClientMessageData.JoinRoom>({
  roomId: requiredString,

  password,
});

export const logIn = joi.object<IClientMessageData.LogIn>({
  name: requiredString,
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

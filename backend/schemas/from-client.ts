import joi from 'joi';

import { IClientMessageData, IMove, RoleInRoom } from '#interfaces';

const idField = joi.string().min(1).required();

export const logIn = joi.object<IClientMessageData.LogIn>({
  name: idField,
});

const password = joi.string().allow('');

export const createRoom = joi.object<IClientMessageData.CreateRoom>({
  title: joi
    .string()
    .min(1)
    .required(),

  password,
});

export const joinRoom = joi.object<IClientMessageData.JoinRoom>({
  roomId: idField,

  joinAs: joi
    .string()
    .valid(RoleInRoom.Player, RoleInRoom.Spectator)
    .required(),

  password,
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
  roomId: idField,
  move,
});

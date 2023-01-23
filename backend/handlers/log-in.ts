import { ClientMessageType, IClientMessageData, ServerMessageType } from '#interfaces';
import { getUniqueString } from '#utils';

import { clientSchemas } from '../schemas';

import { Handler } from '../interfaces';

export const logIn: Handler<ClientMessageType.LogIn> = {
  noAuth: true,
  schema: clientSchemas.logIn,
  callback: async ({ messageData }) => {
    const id = getUniqueString();
    const token = getUniqueString();

    return {
      token: ''
    };
  },
};

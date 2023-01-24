import { ClientMessageType } from '#interfaces';
import { getUniqueString } from '#utils';

import { clientSchemas } from '../schemas';

import { Handler, ICommunicator } from '../interfaces';
import { User, UsersManager } from 'entities';

const emptyCommunicator: ICommunicator = {
  closeConnection: () => { },
  send: async (message) => {
    return {
      success: true,
      message,
      receiverId: '',
    };
  }
};

export const logIn: Handler<ClientMessageType.LogIn> = {
  noAuth: true,
  schema: clientSchemas.logIn,
  callback: async ({ messageData }) => {
    const id = getUniqueString();
    const token = getUniqueString();
    const { name } = messageData;

    const user = new User({
      id,
      token,
      name,
      communicator: emptyCommunicator,
    });

    UsersManager.add(user);

    return {
      id,
      token,
      name,
    };
  },
};

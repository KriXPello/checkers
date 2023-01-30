import { ClientMessageType } from '#interfaces';
import { getUniqueString } from '#utils';

import { clientSchemas } from '../schemas';

import { Handler } from '../interfaces';
import { User, UsersManager } from '../entities';

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
      name: name.slice(0, 14),
      communicator: null,
    });

    UsersManager.add(user);

    // Если пользователь не подключился за указанное время, удаляем его
    setTimeout(() => {
      if (!user.wasConnected) {
        UsersManager.remove(token);
      }
    }, 30 * 1000);

    return {
      id,
      token,
      name,
    };
  },
};

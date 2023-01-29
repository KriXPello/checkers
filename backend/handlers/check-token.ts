import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { Handler } from '../interfaces';
import { RoomsManager, UsersManager } from '../entities';

export const checkToken: Handler<ClientMessageType.CheckToken> = {
  noAuth: true,
  schema: clientSchemas.checkToken,
  callback: async ({ messageData }) => {
    const { token } = messageData;

    const user = UsersManager.find(token);

    if (!user) {
      return {
        valid: false,
      };
    }

    const activeRoom = RoomsManager.findRoomWithUser(user.id);

    return {
      valid: true,
      ...user.serialize(),
      activeRoom: activeRoom?.fullInfo,
    };
  },
};

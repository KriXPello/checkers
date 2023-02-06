import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { Handler } from '../interfaces';
import { RoomsManager, UsersManager } from '../entities';

export const logOut: Handler<ClientMessageType.LogOut> = {
  schema: clientSchemas.logOut,
  callback: async ({ sender }) => {
    await RoomsManager.removeUserFromRoom(sender.id);
    UsersManager.remove(sender.id);

    return {};
  },
};

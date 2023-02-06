import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';

export const leaveRoom: Handler<ClientMessageType.LeaveRoom> = {
  schema: clientSchemas.leaveRoom,
  callback: async ({ sender }) => {
    const leaved = await RoomsManager.removeUserFromRoom(sender.id);

    return {
      leaved,
    };
  },
};

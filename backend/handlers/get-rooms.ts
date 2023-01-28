import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';

export const getRooms: Handler<ClientMessageType.GetRooms> = {
  schema: clientSchemas.getRooms,
  callback: async () => {
    const rooms = RoomsManager.getShortInfoList();

    return {
      rooms,
    };
  },
};

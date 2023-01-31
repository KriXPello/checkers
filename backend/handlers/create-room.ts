import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { Room, RoomsManager } from '../entities';
import { Handler } from '../interfaces';

export const createRoom: Handler<ClientMessageType.CreateRoom> = {
  schema: clientSchemas.createRoom,
  callback: async ({ messageData, sender }) => {
    const { title, password, gameConfig } = messageData;

    const room = new Room({
      creator: sender,
      title: title.slice(0, 17),
      password,
      gameConfig,
    });

    RoomsManager.addRoom(room);

    return {
      roomInfo: room.fullInfo,
    };
  },
};

import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';
import { broadcastRoomFullInfo } from '../services';

export const startGame: Handler<ClientMessageType.StartGame> = {
  schema: clientSchemas.startGame,
  callback: async ({ messageData, sender }) => {
    const { roomId } = messageData;

    const room = RoomsManager.find(roomId);
    if (!room || room.started || room.creator.id != sender.id) {
      return { started: false };
    }

    room.started = true;

    await broadcastRoomFullInfo(room, room.lobby.playersList);

    return {
      started: true,
    };
  },
};

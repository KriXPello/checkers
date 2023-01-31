import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';
import { broadcastRoomState } from '../services';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';

export const swapPlayers: Handler<ClientMessageType.SwapPlayers> = {
  schema: clientSchemas.swapPlayers,
  callback: async ({ messageData, sender }) => {
    const { roomId } = messageData;

    const room = RoomsManager.find(roomId);
    if (!room) {
      return { swapped: false };
    }

    if (room.creator.id != sender.id) {
      return { swapped: false };
    }

    const { lobby } = room;

    lobby.swapUsers();

    await broadcastRoomState(room, lobby.playersList);

    return { swapped: true };
  },
};

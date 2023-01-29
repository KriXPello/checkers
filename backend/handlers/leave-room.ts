import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';
import { broadcastRoomFullInfo } from '../services';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';

export const leaveRoom: Handler<ClientMessageType.LeaveRoom> = {
  schema: clientSchemas.leaveRoom,
  callback: async ({ messageData, sender }) => {
    const { roomId } = messageData;

    const room = RoomsManager.find(roomId);
    if (!room) {
      return {
        leaved: false,
      };
    }

    const { lobby } = room;

    const leaved = lobby.removeUser(sender.id);

    if (!leaved) {
      return { leaved: false };
    }

    if (sender.id === room.creator.id) {
      await RoomsManager.removeRoomWithNotify(room.id);
    } else {
      await broadcastRoomFullInfo(room, lobby.playersList);
    }

    return {
      leaved: true,
    };
  },
};

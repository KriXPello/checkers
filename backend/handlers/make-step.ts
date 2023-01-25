import { ClientMessageType, ServerMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';
import { broadcastRoomFullInfo, broadcastService } from '../services';

export const makeStep: Handler<ClientMessageType.MakeStep> = {
  schema: clientSchemas.makeStep,
  callback: async ({ messageData, sender }) => {
    const { roomId, move } = messageData;

    const room = RoomsManager.find(roomId);
    if (!room) {
      return { success: false };
    }

    const successStep = room.makeStep(sender, move);

    if (!successStep) {
      return { success: false };
    }

    const { playersList } = room.lobby;

    await broadcastRoomFullInfo(room, playersList);

    const { winner } = room;

    if (winner) {
      await broadcastService({
        users: playersList,
        message: {
          type: ServerMessageType.GameOver,
          data: {
            roomId: room.id,
            winner,
          }
        }
      });
    }

    return {
      success: true,
    };
  },
};

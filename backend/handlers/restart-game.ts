import { ClientMessageType, ServerMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';
import { broadcastService } from '../services';

export const restartGame: Handler<ClientMessageType.RestartGame> = {
  schema: clientSchemas.restartGame,
  callback: async ({ messageData, sender }) => {
    const { roomId } = messageData;

    const room = RoomsManager.find(roomId);
    if (!room || !room.winner || room.creator.id != sender.id) {
      return { restarted: false };
    }

    room.restartGame();

    await broadcastService({
      users: room.lobby.playersList,
      message: {
        type: ServerMessageType.GameRestart,
        data: {
          roomFullInfo: room.fullInfo,
        }
      }
    });

    return {
      restarted: true,
    };
  },
};

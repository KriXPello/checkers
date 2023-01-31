import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';
import { broadcastRoomState } from '../services';

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

    await broadcastRoomState(room, playersList);

    return {
      success: true,
    };
  },
};

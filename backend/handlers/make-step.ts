import { IClientMessageData, ServerMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { RoomsManager } from '../entities';
import { HandlerData } from '../interfaces';
import { broadcastRoomFullInfo, broadcastService } from '../services';

export const makeStep: HandlerData<IClientMessageData.MakeStep> = {
  schema: clientSchemas.makeStep,
  callback: async ({ messageData, sender }) => {
    const { roomId, move } = messageData;

    const room = RoomsManager.find(roomId);
    if (!room) {
      return;
    }

    const successStep = room.makeStep(sender, move);

    if (!successStep) {
      return;
    }

    const { allMembersList } = room.lobby;

    await broadcastRoomFullInfo(room, allMembersList);

    const { winner } = room;

    if (winner) {
      await broadcastService({
        users: allMembersList,
        message: {
          type: ServerMessageType.GameOver,
          data: {
            roomId: room.id,
            winner,
          }
        }
      });
    }
  },
};

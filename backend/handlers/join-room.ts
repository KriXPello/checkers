import { ClientMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';
import { broadcastRoomFullInfo } from '../services';

import { RoomsManager } from '../entities';
import { Handler } from '../interfaces';

export const joinRoom: Handler<ClientMessageType.JoinRoom> = {
  schema: clientSchemas.joinRoom,
  callback: async ({ messageData, sender }) => {
    const { roomId, password } = messageData;

    const room = RoomsManager.find(roomId);
    if (!room) {
      return {
        joined: false,
        reason: 'Комната не найдена',
      };
    }

    const { lobby } = room;

    if (!lobby.checkPassword(password)) {
      return {
        joined: false,
        reason: 'Неправильный пароль',
      };
    }

    if (!lobby.hasPlace) {
      return {
        joined: false,
        reason: 'Комната заполнена',
      };
    }

    if (lobby.hasPlayer(sender.id)) {
      return {
        joined: false,
        reason: 'Вы уже в этой комнате',
      };
    }

    const joined = lobby.addPlayer(sender, password);

    if (!joined) {
      return {
        joined: false,
        reason: 'Непредвиденная ошибка',
      };
    }

    const { playersList } = lobby;

    await broadcastRoomFullInfo(room, playersList);

    return {
      joined: true,
      roomInfo: room.fullInfo,
    };
  },
};

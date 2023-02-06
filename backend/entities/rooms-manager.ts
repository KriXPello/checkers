import { ObjectSet } from '#utils';
import { ServerMessageType } from '#interfaces';
import { Room } from './room';
import { broadcastRoomState, broadcastService } from '../services';

export namespace RoomsManager {
  const roomsSet = new ObjectSet<Room>([]);

  export const getList = () => roomsSet.elements;
  export const getShortInfoList = () => roomsSet.elements.map(room => room.shortInfo);

  export const find = (id: string) => roomsSet.find(id);

  export const findRoomWithUser = (userId: string) => {
    const room = roomsSet.elements.find((room) => room.lobby.hasPlayer(userId));

    return room;
  };

  export const addRoom = (room: Room) => {
    roomsSet.insert(room);
  };

  export const removeRoomWithNotify = async (id: string) => {
    const removedRoom = roomsSet.remove(id);

    if (!removedRoom) {
      return;
    }

    await broadcastService({
      users: removedRoom.lobby.playersList,
      message: {
        type: ServerMessageType.RoomDeleted,
        data: {
          roomId: removedRoom.id,
        }
      }
    });
  };

  export const removeUserFromRoom = async (userId: string): Promise<boolean> => {
    const room = findRoomWithUser(userId);

    if (!room) {
      return false;
    }

    const { lobby } = room;

    const leaved = lobby.removeUser(userId);

    if (!leaved) {
      return false;
    }

    if (userId === room.creator.id) {
      await removeRoomWithNotify(room.id);
    } else {
      await broadcastRoomState(room, lobby.playersList);
    }

    return true;
  };
}

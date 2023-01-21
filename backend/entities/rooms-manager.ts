import { ServerMessageType } from '#interfaces';
import { ObjectSet } from '#utils';
import { broadcastRoomFullInfo, broadcastService } from '../services';
import { Room } from './room';
import { User } from './user';
import { UsersManager } from './users-manager';

const removeRoomTimeoutSec = 60 * 1000;

export namespace RoomsManager {
  const roomsSet = new ObjectSet<Room>([]);

  export const getList = () => roomsSet.elements;
  export const getShortInfoList = () => roomsSet.elements.map(room => room.shortInfo);

  export const find = (id: string) => roomsSet.find(id);

  export const broadcastAll = async (users: User[] = UsersManager.getList()) => {
    return broadcastService({
      users,
      message: {
        type: ServerMessageType.RoomsList,
        data: {
          rooms: getShortInfoList(),
        }
      }
    });
  };

  export const addRoomAndNotifyUsers = async (room: Room) => {
    roomsSet.insert(room);

    await broadcastAll();
  };

  export const removeRoomAndNotifyUsers = async (id: string) => {
    roomsSet.remove(id);

    await broadcastAll();
  };

  export const removeUserFromRooms = async (userId: string) => {
    const roomsList = getList();
    const roomsWithUser = roomsList.filter(room => room.lobby.hasUser(userId));

    const noRoomsWithUser = !roomsWithUser.length;
    if (noRoomsWithUser) {
      return;
    }

    roomsWithUser.forEach((room) => {
      const { lobby } = room;
      lobby.removeUser(userId);

      const noPlayersAfterRemove = lobby.playersList.length === 0;

      if (noPlayersAfterRemove) {
        setTimeout(() => {
          const noPlayersAfterTimeout = lobby.playersList.length === 0;
          if (noPlayersAfterTimeout) {
            removeRoomAndNotifyUsers(room.id);
          }
        }, removeRoomTimeoutSec);
      }

      broadcastRoomFullInfo(room, lobby.allMembersList);
    });
  };
}

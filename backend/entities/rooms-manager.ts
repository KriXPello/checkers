import { ObjectSet } from '#utils';
import { Room } from './room';

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

  export const removeRoom = (id: string) => {
    roomsSet.remove(id);
  };
}

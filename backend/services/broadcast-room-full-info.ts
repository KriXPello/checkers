import { ServerMessageType } from '#interfaces';
import { Room, User } from '../entities';
import { broadcastService } from './broadcast';


export const broadcastRoomFullInfo = (room: Room, users: User[]) => {
  return broadcastService({
    users,
    message: {
      type: ServerMessageType.RoomData,
      data: {
        roomFullInfo: room.fullInfo,
      }
    }
  });
};

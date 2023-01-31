import { ServerMessageType } from '#interfaces';
import { Room, User } from '../entities';
import { broadcastService } from './broadcast';

export const broadcastRoomState = (room: Room, users: User[]) => {
  return broadcastService({
    users,
    message: {
      type: ServerMessageType.RoomState,
      data: {
        roomState: room.state,
      }
    }
  });
};

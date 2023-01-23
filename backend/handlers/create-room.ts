// import { IClientMessageData } from '#interfaces';

// import { clientSchemas } from '../schemas';

// import { Room, RoomsManager } from '../entities';
// import { Handler } from '../interfaces';
// import { broadcastRoomFullInfo } from '../services';

// export const createRoom: Handler<IClientMessageData.CreateRoom> = {
//   schema: clientSchemas.createRoom,
//   callback: async ({ messageData, sender }) => {
//     const { title, password } = messageData;

//     const room = new Room({
//       creator: sender,
//       title,
//       password,
//     });

//     await RoomsManager.addRoomAndNotifyUsers(room);

//     await broadcastRoomFullInfo(room, [sender]);
//   },
// };

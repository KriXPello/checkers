// import { IClientMessageData, RoleInRoom } from '#interfaces';

// import { clientSchemas } from '../schemas';
// import { broadcastRoomFullInfo } from '../services';

// import { RoomsManager } from '../entities';
// import { Handler } from '../interfaces';

// export const joinRoom: Handler<IClientMessageData.JoinRoom> = {
//   schema: clientSchemas.joinRoom,
//   callback: async ({ messageData, sender }) => {
//     const { roomId, joinAs, password } = messageData;

//     const room = RoomsManager.find(roomId);
//     if (!room) {
//       return;
//     }

//     const { lobby } = room;

//     let isJoined = false;

//     if (joinAs === RoleInRoom.Player) {
//       isJoined = lobby.joinAsPlayer(sender, password);
//     }

//     if (joinAs === RoleInRoom.Spectator) {
//       isJoined = lobby.joinAsSpectator(sender);
//     }

//     if (!isJoined) {
//       return;
//     }

//     await broadcastRoomFullInfo(room, lobby.allMembersList);
//     await RoomsManager.broadcastAll();
//   },
// };

import ws from 'ws';

import { getUniqueString, logError } from '#utils';

import { WebsocketCommunicator } from './services';
import { RoomsManager, User, UsersManager } from './entities';
import { handleMessage } from './app';
import { ServerMessageType } from '#interfaces';

const wsServer = new ws.Server({
  port: 5000,
});

wsServer.on('connection', (socket) => {
  const id = getUniqueString();

  const communicator = new WebsocketCommunicator({
    socket,
    receiverId: id,
  });
  const user = new User({ id, name: 'Unnamed', communicator });

  UsersManager.add(user);

  socket.on('message', async (data) => {
    try {
      const dataStr = data.toString();

      const message = JSON.parse(dataStr);

      await handleMessage(message, user);
    } catch (err) {
      logError('socket.onmessage', err);
    }
  });

  socket.on('close', async () => {
    UsersManager.remove(id);

    RoomsManager.removeUserFromRooms(id);
    await RoomsManager.broadcastAll();
  });

  RoomsManager.broadcastAll([user]);

  user.sendMessage({
    type: ServerMessageType.UserData,
    data: {
      userData: user.serialize(),
    }
  });
});

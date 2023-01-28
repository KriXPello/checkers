import ws from 'ws';
import express from 'express';
import cors from 'cors';

import { logError } from '#utils';

import { WebsocketCommunicator } from './services';
import { RoomsManager, UsersManager } from './entities';
import { handleMessage } from './app';
import { ServerMessageType } from '../shared/interfaces/messages';

const httpServer = express();
httpServer.use(express.json());
httpServer.use(cors());

httpServer.post('/game', async (req, res) => {
  const token = req.headers['authorization'];

  const result = await handleMessage(req.body, token);

  if (typeof result === 'object') {
    res.status(200).send(JSON.stringify(result));
  } else {
    res.sendStatus(result);
  }
});

httpServer.listen(7000);

const wsServer = new ws.Server({
  port: 7001,
});

wsServer.on('connection', (socket, req) => {
  try {
    const reqUrl = new URL(req.url!, `http://${req.headers.host}`);

    const token = reqUrl.searchParams.get('token');

    if (!token) {
      console.log('no token', req.url);
      socket.terminate();
      return;
    }

    const user = UsersManager.find(token);

    if (!user) {
      console.log('no user', token);
      socket.terminate();
      return;
    }

    const communicator = new WebsocketCommunicator({
      socket,
      receiverId: user.id,
    });

    user.changeCommunicator(communicator);

    user.sendMessage({
      type: ServerMessageType.UserData,
      data: {
        userData: user.serialize(),
      },
    });

    // Если пользователь переподключился во время игры, отправляем ему данные его комнаты
    const roomWithUser = RoomsManager.findRoomWithUser(user.id);
    if (roomWithUser) {
      user.sendMessage({
        type: ServerMessageType.RoomData,
        data: {
          roomFullInfo: roomWithUser.fullInfo,
        }
      });
    }

  } catch (err) {
    logError('error wsServer on connection', err);
  }
});

import ws from 'ws';
import express from 'express';
import cors from 'cors';

import { logError } from '#utils';

import { WebsocketCommunicator } from './services';
import { RoomsManager, UsersManager } from './entities';
import { handleMessage } from './app';
import { ServerMessageType } from '../shared/interfaces/messages';
import { UserState } from './interfaces';

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

const removeFromRoomTimeouts: Record<string, NodeJS.Timeout> = {};

wsServer.on('connection', async (socket, req) => {
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

    // Запускаем таймер покидания комнаты. При переподключении удаляем таймер.
    clearTimeout(removeFromRoomTimeouts[user.id]);
    socket.onclose = () => {
      user.state = UserState.Disconnected;

      removeFromRoomTimeouts[user.id] = setTimeout(() => {
        RoomsManager.removeUserFromRoom(user.id);
      }, 30 * 1000);
    };

    const communicator = new WebsocketCommunicator({
      socket,
      receiverId: user.id,
    });
    user.changeCommunicator(communicator);
    user.state = UserState.Connected;

    await user.sendMessage({
      type: ServerMessageType.UserData,
      data: {
        userData: user.serialize(),
      },
    });
  } catch (err) {
    logError('error wsServer on connection', err);
  }
});

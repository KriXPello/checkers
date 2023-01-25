import ws from 'ws';
import express from 'express';

import { logError } from '#utils';

import { WebsocketCommunicator } from './services';
import { UsersManager } from './entities';
import { handleMessage } from 'app';

const httpServer = express();
httpServer.use(express.json());

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
    const reqUrl = new URL(req.url!);

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

    user.updateCommunicator(communicator);
  } catch (err) {
    logError('wsServer on connection', err);
  }
});

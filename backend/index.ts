import ws from 'ws';
import express from 'express';

import { getUniqueString } from '#utils';

import { WebsocketCommunicator } from './services';
import { User, UsersManager } from './entities';
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
  const id = getUniqueString();
  const token = getUniqueString();

  const communicator = new WebsocketCommunicator({
    socket,
    receiverId: id,
  });
  const user = new User({ id, token, name: 'Unnamed', communicator });

  UsersManager.add(user);
});

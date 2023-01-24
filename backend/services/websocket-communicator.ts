import ws from 'ws';

import { IServerMessage, IUser } from '#interfaces';
import { ICommunicator, ISentMessage } from '../interfaces';

interface ConstructorData {
  socket: ws.WebSocket,
  receiverId: IUser['id'],
}

export class WebsocketCommunicator implements ICommunicator {
  private socket: ws.WebSocket;
  private receiverId: IUser['id'];

  constructor(data: ConstructorData) {
    const { socket, receiverId } = data;
    this.socket = socket;
    this.receiverId = receiverId;
  }

  public closeConnection(): void {
    this.socket.close(1000);
  }

  public send(message: IServerMessage): Promise<ISentMessage> {
    return new Promise<ISentMessage>((resolve) => {
      const { receiverId } = this;

      const sentMessage: ISentMessage = {
        receiverId,
        message,
        success: true,
      };

      const messageJson = JSON.stringify(message);

      this.socket.send(messageJson, (err) => {
        if (err) {
          console.error('User.send:', err.message);
          resolve({
            ...sentMessage,
            success: false,
          });
        };

        resolve(sentMessage);
      });
    });
  }
}

import { IServerMessage, IUser } from '#interfaces';
import { ICommunicator } from '../interfaces';

interface ConstructorData {
  id: string,
  token: string,
  name: string,
  communicator: ICommunicator | null,
}

const mockCommunicator: ICommunicator = {
  closeConnection: () => { },
  send: async (message) => {
    return {
      success: true,
      message,
      receiverId: '',
    };
  }
};

export class User {
  public readonly id: string;
  public readonly token: string;
  public name: string;

  private communicator: ICommunicator;

  constructor(data: ConstructorData) {
    const { id, token, name, communicator } = data;

    this.id = id;
    this.token = token;
    this.name = name;
    this.communicator = communicator ?? mockCommunicator;
  }

  public get wasConnected() {
    return this.communicator != mockCommunicator;
  }

  public changeCommunicator(newCommunicator: ICommunicator) {
    this.communicator.closeConnection();
    this.communicator = newCommunicator;
  }

  public serialize(): IUser {
    const { id, name } = this;

    return { id, name };
  }

  public async sendMessage(message: IServerMessage) {
    return this.communicator.send(message);
  }
}

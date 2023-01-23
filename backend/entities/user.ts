import { IServerMessage, IUser } from '#interfaces';
import { ICommunicator } from '../interfaces';

interface ConstructorData {
  id: string,
  token: string,
  name: string,
  communicator: ICommunicator,
}

export class User {
  public id: string;
  public readonly token: string;
  public name: string;

  private communicator: ICommunicator;

  constructor(data: ConstructorData) {
    const { id, token, name, communicator } = data;

    this.id = id;
    this.token = token;
    this.name = name;
    this.communicator = communicator;
  }

  public serialize(): IUser {
    const { id, name } = this;

    return { id, name };
  }

  public async sendMessage(message: IServerMessage) {
    return this.communicator.send(message);
  }
}

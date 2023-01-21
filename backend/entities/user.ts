import { IServerMessage, IUser } from '#interfaces';
import { ICommunicator } from '../interfaces';

interface ConstructorData {
  id: string,
  name: string,
  communicator: ICommunicator,
}

export class User {
  public id: string;
  public name: string;

  private communicator: ICommunicator;

  constructor(data: ConstructorData) {
    const { id, name, communicator } = data;

    this.id = id;
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

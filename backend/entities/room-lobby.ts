import { ObjectSet } from '#utils';
import { User } from './user';

interface LobbyData {
  creator: User,
  password: string | undefined,
}

export class RoomLobby {
  private players: ObjectSet<User>;
  private spectators: ObjectSet<User>;
  private password: string | undefined;

  // TODO: Создатель помещается в наблюдателей и уже потом может стать игроком
  constructor(data: LobbyData) {
    const { creator, password } = data;
    this.players = new ObjectSet([creator]);
    this.spectators = new ObjectSet([]);
    this.password = password;
  }

  public get isSecured(): boolean {
    return !!this.password;
  }

  public hasPlayer(userId: string): boolean {
    return this.players.has(userId);
  }

  public hasUser(userId: string): boolean {
    return this.players.has(userId) || this.spectators.has(userId);
  };

  public get playersList(): User[] {
    return this.players.elements;
  }

  public get allMembersList(): User[] {
    const allMembers = this.players.elements.concat(this.spectators.elements);
    const joinedSet = new ObjectSet(allMembers);
    return joinedSet.elements;
  }

  public joinAsPlayer(user: User, password: string | undefined): boolean {
    const hasSpace = this.players.length < 2;
    const passwordValid = this.checkPassword(password);

    if (!hasSpace || !passwordValid) {
      return false;
    }

    const insertResult = this.players.insert(user);
    return insertResult;
  }

  public joinAsSpectator(user: User): boolean {
    const isAdded = this.spectators.insert(user);
    return isAdded;
  }

  public removeUser(id: string) {
    const removedUser = this.players.remove(id) || this.spectators.remove(id);

    return removedUser;
  }

  private checkPassword(password: string | undefined): boolean {
    const noPassword = !this.password;
    const passwordValid = password === this.password;
    return noPassword || passwordValid;
  }
}

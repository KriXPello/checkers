import { GameSide } from '../../shared/interfaces/game';
import { User } from './user';

interface LobbyData {
  creator: User,
  password: string | undefined,
}

export class RoomLobby {
  private players: Record<GameSide, User | null>;
  private password: string | undefined;

  constructor(data: LobbyData) {
    const { creator, password } = data;

    this.players = {
      [GameSide.Top]: creator,
      [GameSide.Bottom]: null,
    };
    this.password = password;
  }

  public get isSecured(): boolean {
    return !!this.password;
  }

  public get playersList(): User[] {
    const list = Object.values(this.players)
      .filter(player => player != null) as User[];

    return list;
  }

  public get hasPlace(): boolean {
    const { bottom, top } = this.players;
    return !(bottom && top);
  }

  public hasPlayer(userId: string): boolean {
    const { top, bottom } = this.players;

    return top?.id == userId || bottom?.id == userId;
  }

  public addPlayer(user: User, password: string | undefined): boolean {
    if (this.hasPlace || this.hasPlayer(user.id) || !this.checkPassword(password)) {
      return false;
    }

    return true;
  }

  public removeUser(id: string): User | null {
    for (const key in this.players) {
      const side = key as GameSide;

      const player = this.players[side];
      if (player?.id == id) {
        this.players[side] = null;

        return player;
      }
    }

    return null;
  }

  public swapUsers() {
    const { bottom, top } = this.players;
    this.players = {
      bottom: top,
      top: bottom,
    };
  }

  public checkPassword(password: string | undefined): boolean {
    const noPassword = !this.password;
    const passwordValid = password === this.password;
    return noPassword || passwordValid;
  }
}

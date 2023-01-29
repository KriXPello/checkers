import { GameSide, IActors } from '#interfaces';
import { User } from './user';

interface LobbyData {
  creator: User,
  password: string | null | undefined,
}

export class RoomLobby {
  private players: Record<GameSide, User | null>;
  private password: string | null;

  constructor(data: LobbyData) {
    const { creator, password } = data;

    this.players = {
      [GameSide.Top]: creator,
      [GameSide.Bottom]: null,
    };
    this.password = password || null;
  }

  public get isSecured(): boolean {
    return !!this.password;
  }

  public get playersList(): User[] {
    const { top, bottom } = this.players;
    const list = [];
    if (top) list.push(top);
    if (bottom) list.push(bottom);

    return list;
  }

  public get actors(): IActors {
    const { bottom, top } = this.players;
    return {
      [GameSide.Top]: top?.serialize() ?? null,
      [GameSide.Bottom]: bottom?.serialize() ?? null,
    };
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
    if (!this.hasPlace || this.hasPlayer(user.id) || !this.checkPassword(password)) {
      return false;
    }

    for (const key in this.players) {
      const side = key as GameSide;

      if (this.players[side] == null) {
        this.players[side] = user;
        return true;
      }
    }

    return false;
  }

  public removeUser(id: string): boolean {
    for (const key in this.players) {
      const side = key as GameSide;

      const player = this.players[side];
      if (player?.id == id) {
        this.players[side] = null;

        return true;
      }
    }

    return false;
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

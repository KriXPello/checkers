import { IGameConfig, IMove, IRoomBaseInfo, IRoomFullInfo, IRoomShortInfo, IRoomState, IUser } from '#interfaces';
import { getUniqueString } from '#utils';
import { Game } from '#entities';
import { RoomLobby } from './room-lobby';
import { User } from './user';

interface ConstructorData {
  title: string,
  password: string | null | undefined,
  creator: User,
  gameConfig: IGameConfig,
}

export class Room {
  public readonly id: string;
  public title: string;
  public readonly creator: User;
  public readonly lobby: RoomLobby;
  public started: boolean = false;

  private game: Game;

  constructor(data: ConstructorData) {
    const { title, password, creator, gameConfig } = data;

    this.id = getUniqueString();
    this.title = title;
    this.creator = creator;
    this.lobby = new RoomLobby({ creator, password });
    this.game = Game.createNew(gameConfig);
  }

  public makeStep(initiator: User, move: IMove): boolean {
    if (!this.started) {
      return false;
    }

    const gameAlreadyFinished = !!this.game.winnerSide;
    if (gameAlreadyFinished) {
      return false;
    }

    const isPlayer = this.lobby.hasPlayer(initiator.id);
    if (!isPlayer) {
      return false;
    }

    const activeActor = this.lobby.actors[this.game.turnOf];
    const isActiveActor = activeActor && activeActor.id === initiator.id;
    if (!isActiveActor) {
      return false;
    }

    const unitMoveResult = this.game.moveUnit(move);

    return unitMoveResult;
  }

  public restartGame() {
    this.started = false;
    this.game = Game.createNew(this.game.config);
  };

  public get winner(): IUser | null {
    const { game, lobby } = this;
    const { winnerSide } = game;
    const { actors } = lobby;
    return winnerSide && actors[winnerSide];
  }

  public get shortInfo(): IRoomShortInfo {
    const { baseInfo } = this;
    const { playersList } = this.lobby;

    return {
      ...baseInfo,
      playersCount: playersList.length,
    };
  }

  public get state(): IRoomState {
    const { started, lobby, game, winner } = this;

    return {
      started,
      actors: lobby.actors,
      gameSnapshot: game.snapshot(),
      winner: winner || undefined,
    };
  }

  public get fullInfo(): IRoomFullInfo {
    const { baseInfo, state, game, creator } = this;

    return {
      ...baseInfo,
      ...state,
      creatorId: creator.id,
      gameConfig: game.config,
    };
  }

  private get baseInfo(): IRoomBaseInfo {
    const { id, title } = this;
    const { isSecured } = this.lobby;
    return { id, title, isSecured };
  }
}

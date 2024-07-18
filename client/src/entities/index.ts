export interface IMapSettings {
  sizeX: number;
  sizeY: number;
  initialUnits: IUnit[];
}

export interface IPosition {
  x: number;
  y: number;
}

export enum UnitType {
  Basic,
  Special,
}

export enum GameSide {
  Top,
  Bottom,
}

export interface IUnit {
  id: string;
  position: IPosition;
  type: UnitType;
  side: GameSide;
}

export enum Direction {
  TopLeft,
  Top,
  TopRight,
  Right,
  BottomRight,
  Bottom,
  BottomLeft,
  Left,
}

export enum StepType {
  Move,
  Attack,
}

export type IDirectionsLimitsMap = {
  [D in Direction]?: number;
};

export type IUnitStepSettingsMap = {
  [SType in StepType]: IDirectionsLimitsMap;
};

export type IMoveSettings = {
  [Side in GameSide]: {
    [UType in UnitType]: IUnitStepSettingsMap
  }
};

export interface IGameSettings {
  mustBeat: boolean;
  multipleAttacks: boolean;
  moveSettings: IMoveSettings;
}


export interface IGame {
  settings: IGameSettings;
  map: IMapSettings;
  units: IUnit[];
  activeSide: GameSide;
  lockedUnit?: IUnit;
}

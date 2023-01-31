import joi from 'joi';
import {
  IClientMessageData,
  IMove,
  IGameConfig,
  TableType,
  IMoveSettings,
  GameSide,
  UnitType,
  IDirectionsLimitsMap,
  Direction,
  StepType,
} from '#interfaces';
import { maxStepDistance } from '#constants';

const directionsLimitsMap = joi
  .object<IDirectionsLimitsMap>()
  .min(1)
  .pattern(
    joi
      .string()
      .valid(...Object.values(Direction)),
    joi
      .number()
      .min(0)
      .max(maxStepDistance)
  )
  .required();

const steps = joi
  .object<IMoveSettings[GameSide][UnitType]>({
    [StepType.Move]: directionsLimitsMap,
    [StepType.Attack]: directionsLimitsMap,
  })
  .required();

const unitTypes = joi
  .object<IMoveSettings[GameSide]>({
    [UnitType.Basic]: steps,
    [UnitType.Special]: steps,
  })
  .required();

const moveSettings = joi
  .object<IMoveSettings>({
    [GameSide.Bottom]: unitTypes,
    [GameSide.Top]: unitTypes,
  })
  .required();

const gameConfig = joi.object<IGameConfig>({
  tableType: joi
    .string()
    .valid(...Object.values(TableType))
    .required(),
  mustBeat: joi.bool().required(),
  multipleAttacks: joi.bool().required(),
  moveSettings,
}).required();

export const createRoom = joi.object<IClientMessageData.CreateRoom>({
  title: joi
    .string()
    .min(1)
    .required(),

  password: joi
    .string()
    .allow(''),

  gameConfig,
});

import { Position } from './helpers';
import { IUnit } from './unit';

export enum StepType {
  Move = 'move',
  Attack = 'attack',
}

export type IStep =
  | IStep.Move
  | IStep.Attack;

export namespace IStep {
  export interface Info {
    from: Position,
    destination: Position,
  }

  export interface Move extends Info {
    type: StepType.Move,
  }

  export interface Attack extends Info {
    type: StepType.Attack,
    affectedUnits: IUnit[],
  }
}

export type IAllowedStepsMap = Record<IUnit['id'], IStep[]>;

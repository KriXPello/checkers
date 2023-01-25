import { ServerMessageType, type IServerMessage, type IServerMessageData, type IServerMessageDataMap } from '#interfaces';
import { userData } from './user';

const handleUserData = (data: IServerMessageData.UserData) => {
  const { id, name } = data.userData;

  userData.name = name;
  userData.id = id;
};

const handleRoomData = (data: IServerMessageData.RoomData) => {

};

const handleGameOver = (data: IServerMessageData.GameOver) => {

};

const handleCreatorLeft = (data: IServerMessageData.CreatorLeft) => {

};

const handlersByType: { [T in ServerMessageType]: (data: IServerMessageDataMap[T]) => void | Promise<void> } = {
  [ServerMessageType.UserData]: handleUserData,
  [ServerMessageType.RoomData]: handleRoomData,
  [ServerMessageType.GameOver]: handleGameOver,
  [ServerMessageType.CreatorLeft]: handleCreatorLeft,
};

export const handleMessage = async (message: IServerMessage) => {
  const handler = handlersByType[message.type];
  await handler(message.data as any);
};

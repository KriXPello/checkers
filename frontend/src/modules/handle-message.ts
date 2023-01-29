import { ServerMessageType, type IServerMessage, type IServerMessageData, type IServerMessageDataMap } from '#interfaces';
import { userData } from './user';
import { roomData } from './active-room';
import { route, Route } from './routing';

const handleUserData = (data: IServerMessageData.UserData) => {
  const { id, name } = data.userData;

  userData.name = name;
  userData.id = id;
};

const handleRoomData = (data: IServerMessageData.RoomData) => {
  roomData.value = data.roomFullInfo;

  if (route.value != Route.GameRoom) {
    route.value = Route.GameRoom;
  }
};

const handleGameOver = (data: IServerMessageData.GameOver) => {

};

const handleRoomDeleted = (data: IServerMessageData.RoomDeleted) => {
  if (roomData.value?.id === data.roomId) {
    route.value = Route.RoomsList;
    roomData.value = null;

    alert('Комната была удалена');
  }
};

const handlersByType: { [T in ServerMessageType]: (data: IServerMessageDataMap[T]) => void | Promise<void> } = {
  [ServerMessageType.UserData]: handleUserData,
  [ServerMessageType.RoomData]: handleRoomData,
  [ServerMessageType.GameOver]: handleGameOver,
  [ServerMessageType.RoomDeleted]: handleRoomDeleted,
};

export const handleMessage = async (message: IServerMessage) => {
  const handler = handlersByType[message.type];
  await handler(message.data as any);
};

import { ServerMessageType, type IServerMessage, type IServerMessageData, type IServerMessageDataMap } from '#interfaces';
import { userData } from './user';
import { roomData } from './active-room';
import { route, Route } from './routing';

const handleUserData = (data: IServerMessageData.UserData) => {
  const { id, name } = data.userData;

  userData.name = name;
  userData.id = id;
};

const handleRoomState = (data: IServerMessageData.RoomState) => {
  if (route.value != Route.GameRoom) {
    route.value = Route.GameRoom;
  }

  if (roomData.value) {
    const { actors, gameSnapshot, started } = data.roomState;

    roomData.value.started = started;
    roomData.value.actors = actors;
    roomData.value.gameSnapshot = gameSnapshot;
  }
};

const handleGameRestart = (data: IServerMessageData.GameRestart) => {
  roomData.value = data.roomFullInfo;
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
  [ServerMessageType.RoomState]: handleRoomState,
  [ServerMessageType.GameRestart]: handleGameRestart,
  [ServerMessageType.RoomDeleted]: handleRoomDeleted,
};

export const handleMessage = async (message: IServerMessage) => {
  const handler = handlersByType[message.type];
  await handler(message.data as any);
};

import { ref } from 'vue';

export enum Route {
  NotSet,
  Home,
  RoomsList,
  CreateRoom,
  GameRoom,
}

export const route = ref(Route.NotSet);

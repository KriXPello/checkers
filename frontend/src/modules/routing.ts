import { ref } from 'vue';

export enum Route {
  NotSet,
  Home,
  RoomsList,
  GameRoom,
}

export const route = ref(Route.NotSet);

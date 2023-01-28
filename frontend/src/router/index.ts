import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import RoomsList from '../views/RoomsList.vue';
import GameRoom from '../views/GameRoom.vue';
import { Route } from '@/constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Route.Home,
      name: 'home',
      component: HomeView
    },
    {
      path: Route.RoomsList,
      name: 'rooms',
      component: RoomsList
    },
    {
      path: Route.GameRoom,
      name: 'gameRoom',
      component: GameRoom,
    },
  ]
});

export default router;

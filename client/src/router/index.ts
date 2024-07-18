import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/home-page.vue';
import CreateGame from '../pages/create-game.vue';
import { RouteName } from '~/constants';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.Home,
      component: HomePage,
    },
    {
      path: '/create',
      name: RouteName.CreateGame,
      component: CreateGame,
    }
  ]
});

export default router;

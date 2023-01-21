import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import RoomsListVue from '@/views/RoomsList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomsListVue
    },
  ]
});

export default router;

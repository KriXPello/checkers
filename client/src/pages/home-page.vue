<template>
  <main class="page">
    <input v-model="usernameInput" />

    <button>Присоединиться</button>
    <button @click="startConfigureGame()">Создать игру</button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouteName } from '~/constants';

const usernameInput = ref('');

const router = useRouter();

function startConfigureGame() {
  router.push({ name: RouteName.CreateGame });
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>

<template>
  <div class="player-card">
    <span class="single-line-text">{{ user?.name ?? 'Пусто' }}</span>

    <div
      v-if="user && user.id === userData.id"
      class="you-mark"
    >
      Вы
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IUser } from '#interfaces';
import { userData } from '@/modules';

defineProps<{
  user: null | IUser,
}>()

</script>

<style scoped>
.player-card {
  position: relative;
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.you-mark {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-30%);
  padding: 2px 6px;
  background-color: #4caf50;
  color: white;
  border-radius: 50%;
}
</style>

<template>
  <div class="player-card">
    <div class="icon">
      <svg v-show="user != null" fill="#000000" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM4,23H20a1,1,0,0,0,1-1V18a5.006,5.006,0,0,0-5-5H8a5.006,5.006,0,0,0-5,5v4A1,1,0,0,0,4,23Zm1-5a3,3,0,0,1,3-3h8a3,3,0,0,1,3,3v3H5Z"/>
      </svg>
    </div>

    <span class="single-line-text">{{ user?.name ?? 'Пустое место' }}</span>

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

.icon {
  position: absolute;
  left: 0%;
  transform: translateX(-105%);
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
}

.you-mark {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(40%, -15%);
  padding: 2px 6px;
  background-color: #4caf50;
  color: white;
  border-radius: 50%;
}
</style>

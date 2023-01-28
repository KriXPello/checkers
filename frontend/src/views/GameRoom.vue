<template>
  <main id="game-room" v-if="roomData">
    <div class="room-header">
      <MyButton>Выйти</MyButton>

      <span class="single-line-text">{{ roomData.title }}</span>
    </div>

    <div class="room-content">
      <PlayerCard :user="roomData.actors[GameSide.Top]" />

      <GameTable :snapshot="roomData.gameSnapshot" />

      <PlayerCard :user="roomData.actors[GameSide.Bottom]" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { GameSide } from '#interfaces';
import { MyButton, GameTable, PlayerCard } from '../components'
import { roomData } from '../modules';

</script>

<style scoped>
#game-room {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.room-header {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.room-content {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

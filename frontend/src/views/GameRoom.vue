<template>
  <main id="game-room" v-if="roomData != null">
    <div class="room-header">
      <MyButton
        :disabled="sendingMessage"
        @click="leave"
      >
        Выйти
      </MyButton>

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
import { ClientMessageType, GameSide } from '#interfaces';
import { MyButton, GameTable, PlayerCard } from '../components'
import { roomData, sendingMessage, sendMessage, route, Route } from '../modules';

const leave = async () => {
  const result = await sendMessage({
    type: ClientMessageType.LeaveRoom,
    data: {
      roomId: roomData.value!.id,
    }
  });

  if (result.ok) {
    route.value = Route.RoomsList;
  }
}

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

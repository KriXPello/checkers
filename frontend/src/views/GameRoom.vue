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

      <GameTable
        :snapshot="roomData.gameSnapshot"
        :actors="roomData.actors"
        :locked="sendingMessage"
        :started="roomData.started"
        @move="makeStep"
      >
        <RoomControl
          v-if="!roomData.started"
          :disabled="sendingMessage"
          :is-creator="isCreator"
          @swap="swapPlayers"
          @start="startGame"
        />
      </GameTable>

      <PlayerCard :user="roomData.actors[GameSide.Bottom]" />
    </div>

    <MyModal
      v-if="winner"
      :title="winner.id === userData.id ? 'Победа' : 'Поражение'"
      width="320"
      :content-style="{ padding: '0 8px'}"
    >
      <span v-if="isCreator">Вы можете перезапустить игру или выйти из комнаты</span>
      <span v-else>Вы можете подождать, пока создатель комнаты перезапустит игру или выйти</span>

      <MyButton v-if="isCreator" @click="restartGame">Перезапустить</MyButton>
      <MyButton class="modal-leave-button" @click="leave">Выйти</MyButton>
    </MyModal>
  </main>
</template>

<script lang="ts" setup>
import { computed, onUnmounted } from 'vue';
import { ClientMessageType, GameSide, type IMove } from '#interfaces';
import { MyButton, GameTable, PlayerCard, MyModal, RoomControl } from '../components'
import { roomData, sendingMessage, sendMessage, route, Route, winner, userData } from '../modules';

onUnmounted(() => {
  roomData.value = null;
  winner.value = null;
})

const isCreator = computed(() => roomData.value?.creatorId === userData.id);

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

const makeStep = async (move: IMove) => {
  await sendMessage({
    type: ClientMessageType.MakeStep,
    data: {
      move,
      roomId: roomData.value!.id,
    }
  });
}

const restartGame = async () => {
  await sendMessage({
    type: ClientMessageType.RestartGame,
    data: {
      roomId: roomData.value!.id,
    }
  })
}

const swapPlayers = async () => {
  await sendMessage({
    type: ClientMessageType.SwapPlayers,
    data: {
      roomId: roomData.value!.id,
    }
  })
}

const startGame = async () => {
  await sendMessage({
    type: ClientMessageType.StartGame,
    data: {
      roomId: roomData.value!.id,
    }
  })
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-leave-button {
  margin-top: 8px;
}

</style>

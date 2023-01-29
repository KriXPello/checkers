<template>
  <main>
    <div class="list-container">
      <div class="control-panel">
        <MyButton
          class="refresh-button"
          :disabled="sendingMessage"
          @click="getRooms"
        >
          Обновить
        </MyButton>

        <CreateRoomButton />
      </div>

      <MyModal
        v-if="selectedRoom"
        width="200"
        closable
        :title="selectedRoom.title"
        @close="selectedRoom = null"
      >
        <SelectedRoomForm :room="selectedRoom" />
      </MyModal>

      <table>
        <thead>
          <tr>
            <th id="th-title">Название</th>
            <th id="th-players">Игроки</th>
            <th id="th-type">Тип</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="room in rooms"
            class="room-row"
            :key="room.id"
            @click="selectedRoom = room"
          >
            <td>{{ room.title }}</td>
            <td>{{ `${room.playersCount}/2` }}</td>
            <td>{{ room.isSecured ? 'закрытая' : 'открытая' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { ClientMessageType, type IRoomShortInfo } from '#interfaces';
import { CreateRoomButton, MyButton, MyModal, SelectedRoomForm } from '../components';
import { sendingMessage, sendMessage } from '@/modules';

const rooms = ref<IRoomShortInfo[]>([]);
const selectedRoom = ref<IRoomShortInfo | null>(null);

const getRooms = async () => {
  const result = await sendMessage({
    type: ClientMessageType.GetRooms,
    data: {},
  })

  if (result.ok) {
    rooms.value = result.data.rooms;
  }
}

onBeforeMount(getRooms);

</script>

<style scoped>
.list-container {
  width: 100%;
  max-width: 400px;
  height: 100%;
}

.control-panel {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.refresh-button {
  margin-right: 8px;
}

table {
  width: 100%;
}

#th-title {
  width: 50%;
}
#th-players, #th-type {
  width: 25%;
}

.room-row {
  transition: all 200ms;
}
.room-row:hover {
  background-color: lightgray;
}
</style>

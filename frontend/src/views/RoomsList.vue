<template>
  <main>
    <div id="list-container">
      <div id="control-panel">
        <CreateRoomButton @new-room="addRoomToList" />
      </div>

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
            @click=""
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
import { ref } from 'vue';
import type { IRoomShortInfo } from '#interfaces';
import CreateRoomButton from '@/components/CreateRoomButton.vue';

const rooms = ref<IRoomShortInfo[]>([]);

const addRoomToList = (room: IRoomShortInfo) => {
  rooms.value.push(room);
}
</script>

<style scoped>
#list-container {
  width: 100%;
  max-width: 400px;
  height: 100%;
}

#control-panel {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

<template>
  <main>
    <div class="list-container">
      <div class="control-panel">
        <span class="single-line-text page-label">Выбор комнаты</span>

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

      <div class="table">
        <div class="colgroup">
          <div class="col single-line-text" style="width: 100%"></div>
          <div class="col" style="width: auto"></div>
          <div class="col" style="width: auto"></div>
        </div>
        <div class="thead">
          <div class="row">
            <div class="th">Название</div>
            <div class="th">Игроки</div>
            <div class="th">Тип</div>
          </div>
        </div>
        <div class="tbody">
          <div
            v-for="room in rooms"
            class="row"
            :key="room.id"
            @click="selectedRoom = room"
          >
            <div class="td single-line-text">{{ room.title }}</div>
            <div class="td">{{ `${room.playersCount}/2` }}</div>
            <div class="td">{{ room.isSecured ? 'закрытая' : 'открытая' }}</div>
          </div>
        </div>
      </div>
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
  height: 30px;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
}

.page-label {
  font-weight: 600;
  margin-right: auto;
}

.table {
  width: 100%;
  display: table;
  empty-cells: show;
  border-radius: 16px;
  /* background-color: red; */
}
.colgroup {
  display: table-column-group;
}
.col {
  display: table-column;
}
.thead {
  display: table-header-group;
}
.tbody {
  display: table-row-group;
}
.row {
  display: table-row;
}
.th {
  display: table-cell;
  font-weight: 500;
  padding: 8px;
}
.td {
  display: table-cell;
  padding: 4px 8px;
  font-size: 14px;
  text-overflow: ellipsis;
}

.thead .row .th {
  border-bottom: solid 1px lightgray;
}

.tbody .row:hover {
  cursor: pointer;
  background-color: #f1f1f1;
}

@media (max-width: 290px) {
  .page-label {
    display: none;
  }
}
</style>

<template>
  <main class="create-room">
    <div class="wrapper">
      <MyInput
        class="field"
        label="Название"
        v-model="title"
        required
        @keyup.enter="createRoom"
      />
      <MyInput
        class="field"
        label="Пароль (необязательно)"
        v-model="password"
        @keyup.enter="createRoom"
      />

      <MyCheckbox
        v-model="multipleAttacks"
        label="Атаки подряд"
      />

      <MyCheckbox
        v-model="mustBeat"
        label="Обязательная атака"
      />

      <MoveSettings v-model="moveSettings" />

      <MyButton
        id="create-button"
        :disabled="!title || sendingMessage"
        @click="createRoom"
      >Создать</MyButton>
    </div>
  </main>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { ClientMessageType, TableType } from '#interfaces';
import { defaultMoveSettings } from '#constants';
import { MyCheckbox, MyInput, MyButton, MoveSettings } from '../components';
import { sendMessage, sendingMessage, roomData, Route, route } from '../modules';

const title = ref('');
const password = ref('');
const multipleAttacks = ref(true);
const mustBeat = ref(true);
const moveSettings = ref(defaultMoveSettings());

const createRoom = async () => {
  if (!title.value || sendingMessage.value) {
    return;
  }

  const result = await sendMessage({
    type: ClientMessageType.CreateRoom,
    data: {
      title: title.value,
      password: password.value,
      gameConfig: {
        tableType: TableType.Basic,
        multipleAttacks: multipleAttacks.value,
        mustBeat: mustBeat.value,
        moveSettings: moveSettings.value,
      }
    }
  })

  if (result.ok) {
    const { roomInfo } = result.data;

    roomData.value = roomInfo;

    title.value = '';
    password.value = '';

    route.value = Route.GameRoom
  } else {
    alert('Не удалось создать комнату')
  }
}

</script>

<style scoped>
.create-room {
  overflow-x: hidden;
}

.wrapper {
  width: 100%;
  max-width: 400px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

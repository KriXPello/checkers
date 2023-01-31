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

      <div
        v-for="(sideTitle, side) in sides"
        class="move-settings-side-group"
      >
        <span class="single-line-text">{{ sideTitle }}</span>
        <div
          v-for="unitType in units"
          class="move-settings-unit-group"
        >
          <DirectionsGrid
            v-for="stepType in steps"
            :value="moveSettings[side][unitType][stepType]"
            @input="moveSettings[side][unitType][stepType][$event.direction] = $event.value"
          >

          </DirectionsGrid>
        </div>
      </div>

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
import { ClientMessageType, GameSide, StepType, TableType, UnitType } from '#interfaces';
import { defaultMoveSettings } from '#constants';
import { DirectionsGrid, MyCheckbox, MyInput, MyButton } from '../components';
import { sendMessage, sendingMessage, roomData, Route, route } from '../modules';

const sides = {
  [GameSide.Top]: 'Верхняя сторона',
  [GameSide.Bottom]: 'Нижняя сторона',
}

const units = [
  UnitType.Basic,
  UnitType.Special,
]

const steps = [
  StepType.Move,
  StepType.Attack,
]

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

.move-settings-side-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.move-settings-unit-group {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>

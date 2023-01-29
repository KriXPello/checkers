<template>
  <div class="selected-room-form">
    <MyInput
      v-if="room.isSecured"
      class="password-input"
      type="password"
      label="Пароль"
      v-model="password"
    />

    <MyButton
      class="join-button"
      :disabled="(room.isSecured && !password) || sendingMessage"
      @click="join"
    >
      Подключиться
    </MyButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ClientMessageType, type IRoomShortInfo } from '#interfaces';
import { MyButton, MyInput } from '../common';
import { roomData, sendingMessage, sendMessage, route, Route } from '@/modules';

const props = defineProps<{
  room: IRoomShortInfo,
}>()

const password = ref('');

const join = async () => {
  const result = await sendMessage({
    type: ClientMessageType.JoinRoom,
    data: {
      roomId: props.room.id,
      password: password.value,
    }
  })

  if (!result.ok) {
    return;
  }

  const { data } = result;

  if (data.joined) {
    roomData.value = data.roomInfo;

    route.value = Route.GameRoom;
  } else {
    alert(data.reason);
  }
}
</script>

<style scoped>
.selected-room-form {
  display: flex;
  flex-direction: column;
}

.password-input {
  margin-top: 8px;
}

.join-button {
  margin-top: 8px;
}
</style>

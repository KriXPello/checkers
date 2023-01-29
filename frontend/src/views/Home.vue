<template>
  <main>
    <MyInput v-model="nameInput" label="Имя" required />
    <MyButton
      id="play-button"
      :disabled="!nameInput || sendingMessage || connectionState === ConnectionState.Connecting"
      @click="login"
    >Играть</MyButton>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ClientMessageType } from '#interfaces';
import {
  sendMessage,
  userData,
  sendingMessage,
  connectionState,
  connect,
  saveToken,
  ConnectionState,
  route,
  Route,
} from '@/modules';
import { MyButton, MyInput } from '../components';

const nameInput = ref('');

const login = async () => {
  const result = await sendMessage({
    type: ClientMessageType.LogIn,
    data: {
      name: nameInput.value,
    },
  })

  if (result.ok) {
    const { id, name, token } = result.data;
    userData.id = id;
    userData.token = token;
    userData.name = name;

    const isConnected = await connect(token);

    if (isConnected) {
      nameInput.value = '';
      saveToken(token);

      route.value = Route.RoomsList;
    } else {
      alert('Не удалось подключиться');
    }
  }
}
</script>

<style scoped>
#play-button {
  margin-left: 8px;
}
</style>

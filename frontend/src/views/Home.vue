<template>
  <main>
    <MyInput v-model="nameInput" label="Имя" required @keyup.enter="login" />
    <MyButton
      id="play-button"
      :disabled="disableLoginButton"
      @click="login"
    >Играть</MyButton>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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

const disableLoginButton = computed(() => {
  return !nameInput.value || sendingMessage.value || connectionState.value === ConnectionState.Connecting
})

const login = async () => {
  if (disableLoginButton.value) {
    return;
  }

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

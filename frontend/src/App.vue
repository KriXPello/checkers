<template>
  <header v-if="userData.name && userData.id">
    <span>{{ userData.name ?? '' }}</span>
    <MyButton
      :disabled="sendingMessage"
      invisible-disable
      @click="logOut"
    >
      Выйти
    </MyButton>
  </header>

  <div id="router-wrapper">
    <GameRoom v-if="route == Route.GameRoom" />
    <Home v-if="route == Route.Home" />
    <RoomsList v-if="route == Route.RoomsList" />
    <CreateRoom v-if="route == Route.CreateRoom" />

    <MyModal v-if="errorText">
      <span>{{ errorText }}</span>

      <MyButton @click="init">Повторить</MyButton>
    </MyModal>

    <ConnectionOverlay />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { ClientMessageType } from '#interfaces';
import { ConnectionOverlay, MyButton, MyModal } from './components';
import { CreateRoom, GameRoom, Home, RoomsList } from './views'
import { clearToken, connect, extractToken, sendMessage, userData, route, Route, roomData, sendingMessage } from './modules';

const errorText = ref('');

const init = async () => {
  errorText.value = '';

  const tokenFromStorage = extractToken();
  if (!tokenFromStorage) {
    route.value = Route.Home;
    return;
  }

  const result = await sendMessage({
    type: ClientMessageType.CheckToken,
    data: {
      token: tokenFromStorage,
    }
  })

  if (!result.ok) {
    errorText.value = 'Произошла непредвиденная ошибка'
    return;
  }

  if (result.data.valid) {
    const { id, name, activeRoom } = result.data;

    userData.id = id;
    userData.name = name;
    userData.token = tokenFromStorage;

    const isConnected = await connect(tokenFromStorage);

    if (!isConnected) {
      errorText.value = 'Не удалось подключиться к серверу';
      return;
    }

    if (activeRoom) {
      roomData.value = activeRoom;

      route.value = Route.GameRoom;
    } else {
      route.value = Route.RoomsList;
    }
  } else {
    clearToken();

    route.value = Route.Home;
  }
}

onBeforeMount(init);

const logOut = async () => {
  const result = await sendMessage({
    type: ClientMessageType.LogOut,
    data: {}
  });

  if (result.ok) {
    userData.id = '';
    userData.name = '';
    userData.token = '';
    route.value = Route.Home;
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 50px;
  padding: 0 8px;
  border-bottom: solid 1px lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}

header span {
  margin-right: 8px;
}

#router-wrapper {
  flex-grow: 1;
}
</style>

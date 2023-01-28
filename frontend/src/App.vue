<template>
  <!-- <header>

  </header> -->

  <div id="router-wrapper">
    <RouterView />

    <ConnectionOverlay />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import { ClientMessageType } from '#interfaces';
import { ConnectionOverlay } from './components';
import { clearToken, connect, extractToken, sendMessage, userData } from './modules';
import { Route } from './constants';

const router = useRouter();

onBeforeMount(async () => {
  const tokenFromStorage = extractToken();
  if (!tokenFromStorage) {
    return;
  }

  const result = await sendMessage({
    type: ClientMessageType.CheckToken,
    data: {
      token: tokenFromStorage,
    }
  })

  if (!result.ok) {
    return;
  }

  if (result.data.valid) {
    const { id, name } = result.data;

    userData.id = id;
    userData.name = name;
    userData.token = tokenFromStorage;

    const isConnected = await connect(tokenFromStorage);

    if (isConnected && router.currentRoute.value.path == Route.Home) {
      router.replace(Route.RoomsList);
    }
  } else {
    clearToken();

    router.replace(Route.Home);
  }
})
</script>

<style scoped>
header {
  width: 100%;
  height: 50px;
  border-bottom: solid 1px lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
}

header span {
  margin-right: 8px;
}

#router-wrapper {
  flex-grow: 1;
}
</style>

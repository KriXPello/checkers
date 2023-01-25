<template>
  <!-- <header>

  </header> -->

  <div id="router-wrapper">
    <RouterView />

    <ConnectionOverlay />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ClientMessageType } from '#interfaces';
import ConnectionOverlay from './components/ConnectionOverlay.vue';
import { connect, sendMessage, userData } from './modules';

const router = useRouter();

const tokenKey = 'token';
const tokenFromStorage = localStorage.getItem(tokenKey);
if (tokenFromStorage) {
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

    connect(tokenFromStorage);
  } else {
    localStorage.removeItem(tokenKey);

    router.replace('/');
  }
}
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

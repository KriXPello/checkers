<template>
  <MyButton @click="isOpen = true">Создать</MyButton>

  <MyModal
    v-if="isOpen"
    title="Создание комнаты"
    width="300"
    height="200"
    closable
    @close="isOpen = false"
  >
    <MyInput class="field" label="Название" v-model="title" required/>
    <MyInput class="field" label="Пароль (необязательно)" v-model="password"/>

    <MyButton
      id="create-button"
      :disabled="!title || sendingMessage"
      @click="createRoom"
    >Создать</MyButton>
  </MyModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ClientMessageType } from '#interfaces';
import { MyButton, MyInput, MyModal } from '../common';
import { sendMessage, sendingMessage, roomData, route, Route } from '@/modules';

const title = ref('');
const password = ref('');
const isOpen = ref(false);

const createRoom = async () => {
  const result = await sendMessage({
    type: ClientMessageType.CreateRoom,
    data: {
      title: title.value,
      password: password.value,
    }
  })

  if (result.ok) {
    const { roomInfo } = result.data;

    roomData.value = roomInfo;

    isOpen.value = false;
    title.value = '';
    password.value = '';

    route.value = Route.GameRoom
  } else {
    alert('Не удалось создать комнату')
  }
}

</script>

<style scoped>
.field {
  margin-top: 8px;
}

#create-button {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
</style>

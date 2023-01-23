<template>
  <MyModal
    :shown="connectionState == ConnectionState.Connecting"
    hide-header
  >
    <div class="modal-content">
      Подключение...
    </div>
  </MyModal>

  <MyModal
    :shown="connectionState == ConnectionState.Disconnected"
    hide-header
  >
    <div class="modal-content">
      Подключение прервано
    </div>

    <MyButton @click="reconnect">Переподключиться</MyButton>
  </MyModal>
</template>

<script lang="ts" setup>
import MyModal from './MyModal.vue';
import { connectionState, ConnectionState, reconnect } from '../modules'
import MyButton from './MyButton.vue';
</script>

<style scoped>
.modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <MyModal
    v-if="connectionState == ConnectionState.Connecting"
    hide-header
  >
    <div class="modal-content">
      <span>Подключение...</span>
    </div>
  </MyModal>

  <MyModal
    v-if="connectionState == ConnectionState.Disconnected"
    hide-header
  >
    <div class="modal-content">
      <span>Подключение прервано</span>

      <MyButton @click="reconnect">Переподключиться</MyButton>
    </div>

  </MyModal>
</template>

<script lang="ts" setup>
import { MyButton, MyModal } from '../common';
import { connectionState, ConnectionState, reconnect } from '@/modules';
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

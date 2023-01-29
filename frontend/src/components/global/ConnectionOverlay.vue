<template>
  <MyModal
    v-if="connectionState == ConnectionState.Connecting"
    hide-header
  >
    <span>Подключение...</span>
  </MyModal>

  <MyModal
    v-if="connectionState == ConnectionState.Disconnected"
    hide-header
  >
    <span>Подключение прервано</span>

    <MyButton @click="reconnect">Переподключиться</MyButton>
  </MyModal>
</template>

<script lang="ts" setup>
import { MyButton, MyModal } from '../common';
import { connectionState, ConnectionState, reconnect } from '@/modules';
</script>

<template>
  <header>
    <span>
      {{ connectionStatus }}
    </span>

    <MyButton
      v-if="!isConnected"
      :disabled="isConnecting"
      @click="reconnect"
    >
      Переподключиться
    </MyButton>
  </header>

  <div id="router-wrapper">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MyButton from './components/MyButton.vue';
import { isConnected, isConnecting, reconnect } from './modules/connection'

const connectionStatus = computed(() => {
  const value = isConnected.value ? 'Подключён' : 'Не подключён';
  return `Статус: ${value}`;
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

<template>
  <!-- <header>

  </header> -->

  <div id="router-wrapper">
    <RouterView />

    <ConnectionOverlay />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ConnectionOverlay from './components/ConnectionOverlay.vue';
import MyButton from './components/MyButton.vue';
import { reconnect } from './modules/connection'

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

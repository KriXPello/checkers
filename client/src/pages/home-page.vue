<template>
  <main class="page">
    <template v-if="state == State.Menu">
      <MapGrid :size-x="5" :size-y="4" :cell-size="30" />

      <input />

      <button>Присоединиться</button>
      <button>Создать игру</button>
    </template>

    <template v-if="state == State.ConfigureGame">

    </template>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapGrid from '~/components/map-grid.vue';
import { IGameSettings, IMap } from '~/entities';


const usernameInput = ref('');

enum State {
  Menu,
  ConfigureGame,
  WaitUrl,
}

const state = ref(State.Menu);

function startConfigureGame() {
  state.value = State.ConfigureGame;
}

const mapSettings = ref<IMap>({
  sizeX: 8,
  sizeY: 8,
  initialUnits: [],
})

</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
}
</style>

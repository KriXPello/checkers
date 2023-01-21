<template>
  <main>
    <div id="list-container">
      <div id="control-panel">
        <MyButton disabled>Создать</MyButton>
      </div>

      <table>
        <thead>
          <tr>
            <th id="th-title">Название</th>
            <th id="th-players">Игроки</th>
            <th id="th-type">Тип</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="room.id">
            <td>{{ room.title }}</td>
            <td>{{ `${room.playersCount}/2` }}</td>
            <td>{{ room.isSecured ? 'закрытая' : 'открытая' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MyButton from '@/components/MyButton.vue';
import type { IRoomShortInfo } from '#interfaces';

const rooms = ref<IRoomShortInfo[]>([]);


</script>

<style scoped>
#list-container {
  width: 100%;
  max-width: 400px;
  height: 100%;
}

#control-panel {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

table {
  width: 100%;
}

#th-title {
  width: 50%;
}
#th-players, #th-type {
  width: 25%;
}
</style>

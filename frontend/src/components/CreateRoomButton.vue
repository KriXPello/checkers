<template>
  <MyButton @click="isOpen = true">Создать</MyButton>

  <MyModal
    title="Создание комнаты"
    width="500"
    height="400"
    closable
    :shown="isOpen"
    @close="isOpen = false"
  >

  </MyModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { IRoomShortInfo } from '#interfaces'
import MyButton from './MyButton.vue';
import MyModal from './MyModal.vue';

const emit = defineEmits<{
  (e: 'newRoom', room: IRoomShortInfo): void,
}>()

const isOpen = ref(false);

</script>

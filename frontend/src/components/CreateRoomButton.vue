<template>
  <MyButton @click="isOpen = true">Создать</MyButton>

  <MyModal
    title="Создание комнаты"
    width="300"
    height="200"
    closable
    :shown="isOpen"
    @close="isOpen = false"
  >
    <MyInput label="Название" v-model="title" required/>
    <MyInput label="Пароль (необязательно)" v-model="password"/>

    <MyButton :disabled="!title || isLoading">Создать</MyButton>
  </MyModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { IRoomShortInfo } from '#interfaces'
import MyButton from './MyButton.vue';
import MyModal from './MyModal.vue';
import MyInput from './MyInput.vue';

const emit = defineEmits<{
  (e: 'newRoom', room: IRoomShortInfo): void,
}>()

const title = ref('');
const password = ref('');
const isOpen = ref(false);
const isLoading = ref(false);

const createRoom = async () => {

}

</script>

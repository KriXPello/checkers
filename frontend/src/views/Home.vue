<template>
  <main>
    <MyInput v-model="name" label="Имя" />
    <MyButton :disabled="!name" @click="">Играть</MyButton>
  </main>
</template>

<script setup lang="ts">
import MyButton from '@/components/MyButton.vue';
import { ref } from 'vue';
import MyInput from '../components/MyInput.vue';

const name = ref('');

const tokenFromStorage = localStorage.getItem('token');

if (tokenFromStorage) {

}

</script>

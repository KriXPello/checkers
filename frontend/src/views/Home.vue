<template>
  <main>
    <MyInput v-model="name" label="Имя" required />
    <MyButton :disabled="!name || sendingMessage" @click="login">Играть</MyButton>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { ClientMessageType } from '#interfaces';
import MyButton from '@/components/MyButton.vue';
import MyInput from '@/components/MyInput.vue';
import { sendMessage, userData, sendingMessage } from '@/modules';

const name = ref('');

const router = useRouter();

const login = async () => {
  const result = await sendMessage({
    type: ClientMessageType.LogIn,
    data: {
      name: name.value,
    },
  })

  if (result.ok) {
    const { id, name, token } = result.data;
    userData.id = id;
    userData.token = token;
    userData.name = name;

    router.replace('/rooms');
  }
}
</script>

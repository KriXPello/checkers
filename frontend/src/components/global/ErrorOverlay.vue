<template>
  <MyModal
    v-if="somethingWentWrong"
    hide-header
  >
    <div class="modal-content">
      <span>Что-то пошло не так... Попробуйте ещё раз</span>

      <MyButton @click="somethingWentWrong = false">Закрыть</MyButton>
    </div>
  </MyModal>
</template>

<script lang="ts" setup>
import { MyButton, MyModal } from '../common';
import { somethingWentWrong } from '@/modules';
</script>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

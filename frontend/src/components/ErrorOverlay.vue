<template>
  <MyModal
    :shown="somethingWentWrong"
    hide-header
  >
    <div class="modal-content">
      <span>Что-то пошло не так... Попробуйте ещё раз</span>

      <MyButton @click="somethingWentWrong = false">Закрыть</MyButton>
    </div>
  </MyModal>
</template>

<script lang="ts" setup>
import MyModal from './MyModal.vue';
import { somethingWentWrong } from '../modules'
import MyButton from './MyButton.vue';
</script>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

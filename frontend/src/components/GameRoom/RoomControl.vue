<template>
  <div class="room-control">
    <template v-if="isCreator">
      <MyButton
        class="control-button"
        @click="emit('swap')"
        :disabled="disabled"
      >
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.00006 19L8.00006 4M8.00006 4L11.0001 7M8.00006 4L5 7.00006M16.0001 5V20M16.0001 20L19 17.0001M16.0001 20L13.0001 17.0001"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"/>
        </svg>
      </MyButton>

      <MyButton
        class="control-button start-button"
        @click="emit('start')"
        :disabled="disabled"
      >
        <svg width="34px" height="30px" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 18V6L17 12L6 18Z"
            stroke="#000000"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
      </MyButton>
    </template>

    <template v-else>
      <span class="single-line-text">Ожидание начала игры</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { MyButton } from '../common';

defineProps<{
  disabled: boolean,
  isCreator: boolean,
}>()

const emit = defineEmits(['swap', 'start']);
</script>

<style scoped>
.room-control {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;

  display: flex;
  flex-direction: row;

  border-radius: 16px;
  background-color: white;

  box-shadow: 0 0 32px #787878;
}

.control-button {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-button {
  margin-left: 8px;
}
</style>

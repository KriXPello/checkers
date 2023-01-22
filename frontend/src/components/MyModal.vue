<template>
  <Teleport to="body">
    <div v-if="shown" class="my-modal-background">
      <div
        class="my-modal-container"
        :style="containerStyles"
      >
        <div class="my-modal-header">
          <span class="single-line-text">{{ title }}</span>
          <div v-if="closable" @click="closeModal">✖</div>
        </div>

        <div class="my-modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, type StyleValue } from 'vue';

const { width, height } = defineProps<{
  title?: string,
  shown?: boolean,
  closable?: boolean,
  width?: string | number,
  height?: string | number,
}>()

const emit = defineEmits(['close'])

const closeModal = () => emit('close');

const widthNum = Number(width);
const heightNum = Number(height);

const containerStyles = computed<StyleValue>(() => ({
  width: isNaN(widthNum) ? width : `${widthNum}px`,
  height: isNaN(heightNum) ? height : `${heightNum}px`,
}))
</script>

<style scoped>
.my-modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(211, 211, 211, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-modal-container {
  min-width: 100px;
  padding: 8px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 2px 2px 10px lightgray;
}

.my-modal-header {
  width: 100%;
  height: 30px;
  padding-left: 8px;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.my-modal-header span {
  font-size: 18px;
  font-weight: 600;
}

.my-modal-header div {
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-modal-content {
  flex-grow: 1;
}
</style>

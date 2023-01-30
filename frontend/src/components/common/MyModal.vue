<template>
  <Teleport to="body">
    <div class="my-modal-background">
      <div
        class="container"
        :style="containerStyles"
      >
        <div v-if="!hideHeader" class="header">
          <span class="single-line-text">{{ title }}</span>
          <div v-if="closable" @click="closeModal">✖</div>
        </div>

        <div class="content" :style="contentStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, type StyleValue } from 'vue';

const props = defineProps<{
  title?: string,
  closable?: boolean,
  hideHeader?: boolean,
  width?: string | number,
  height?: string | number,
  contentStyle?: StyleValue,
}>()

const emit = defineEmits(['close'])

const closeModal = () => emit('close');

const containerStyles = computed<StyleValue>(() => {
  const widthNum = Number(props.width);
  const heightNum = Number(props.height);

  return {
    width: isNaN(widthNum) ? props.width : `${widthNum}px`,
    height: isNaN(heightNum) ? props.height : `${heightNum}px`,
  }
})
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

.container {
  min-width: 100px;
  padding: 8px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 2px 2px 10px lightgray;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 30px;
  padding-left: 8px;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header span {
  font-size: 18px;
  font-weight: 600;
}

.header div {
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>

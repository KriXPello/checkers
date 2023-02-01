<template>
  <div
    class="active-cell-container"
    :class="{ unavailable }"
    :style="containerStyle"
    @click="emitClick"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, type StyleValue } from 'vue';
import type { Position } from '#interfaces';

const p = defineProps<{
  position: Position,
  unavailable?: boolean,
}>();

const emit = defineEmits(['click']);

const emitClick = () => {
  if (!p.unavailable) {
    emit('click');
  }
}

const containerStyle = computed<StyleValue>(() => ({
  '--x-pos': p.position[0],
  '--y-pos': p.position[1],
}))
</script>

<style scoped>
.active-cell-container {
  --x-pos: 0;
  --y-pos: 0;

  position: absolute;
  left: calc(var(--side) * var(--x-pos));
  top: calc(var(--side) * var(--y-pos));

  width: var(--side);
  height: var(--side);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 200ms;
  cursor: pointer;
}

.unavailable {
  cursor: not-allowed;
  opacity: 0.8;
}
</style>

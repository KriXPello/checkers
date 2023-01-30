<template>
  <div
    class="round-container"
    :style="containerStyle"
    @click="emit('click')"
  >
    <div class="round" :style="roundStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type StyleValue } from 'vue';
import type { Position } from '#interfaces';

interface Props {
  position: Position,
  color: string,
  scale?: number,
}

const p = withDefaults(defineProps<Props>(), {
  scale: 1,
});

const emit = defineEmits(['click']);

const containerStyle = computed<StyleValue>(() => ({
  '--x-pos': p.position[0],
  '--y-pos': p.position[1],
}))

const roundStyle = computed<StyleValue>(() => ({
  '--scale': p.scale,
  backgroundColor: p.color,
}))
</script>

<style scoped>
.round-container {
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
}

.round {
  --scale: 0.9;

  width: calc(100% * var(--scale));
  height: calc(100% * var(--scale));

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
}
</style>

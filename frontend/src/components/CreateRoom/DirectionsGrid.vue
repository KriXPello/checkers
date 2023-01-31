<template>
  <div class="direction-grid-container">
    <input
      v-for="direction in directionsList"
      class="cell"
      :style="{
        '--x-offset': directionsMap[direction][0],
        '--y-offset': directionsMap[direction][1],
      }"
      type="number"
      min="0"
      :max="maxStepDistance"
      :value="value[direction]"
      @focus="($event.target as HTMLInputElement).select()"
      @input="emitInput(direction, ($event.target as HTMLInputElement).value)"
    />

    <div class="cell center">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { directionsMap, maxStepDistance } from '#constants';
import { Direction, IDirectionsLimitsMap } from '#interfaces'

defineProps<{
  value: IDirectionsLimitsMap,
}>()

const emit = defineEmits<{
  (event: 'input', value: { direction: Direction, value: number | undefined }): void,
}>()

const directionsList = Object.keys(directionsMap) as Direction[];

const emitInput = (direction: Direction, rawValue: string | number) => {
  const rawValueNum = Number(rawValue);
  const value = rawValueNum || undefined;

  emit('input', { direction, value });
}
</script>

<style scoped>
.direction-grid-container {
  position: relative;
  width: 150px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell {
  --x-offset: 0;
  --y-offset: 0;
  --side: calc(100% / 3);
  --border: 1px solid lightgray;

  position: absolute;
  transform: translate(
    calc(100% * var(--x-offset)),
    calc(100% * var(--y-offset))
  );
  width: var(--side);
  height: var(--side);

  border: none;
}

input.cell {
  text-align: center;
  outline: none;
  font-size: 12px;
}

.cell:nth-child(4n+2) {
  border-left: var(--border);
  border-right: var(--border);
}

.cell:nth-child(4n+4) {
  border-top: var(--border);
  border-bottom: var(--border);
}

.cell.center {
  border: var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
}

.input.cell:active {
  border-width: 1px;
  border-color: gray;
  border-style: solid;
}
</style>

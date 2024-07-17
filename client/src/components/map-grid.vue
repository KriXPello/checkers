<template>
  <div class="map-grid" :style="containerStyle">
    <div
      v-for="pos in cells"
      class="cell"
      :class="cellClass(pos)"
      @click="emit('cellClick', pos)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { StyleValue, computed } from 'vue';
import { IPosition } from '~/entities';

const p = defineProps<{
  /** in cells */
  sizeX: number;
  /** in cells */
  sizeY: number;
  /** in px */
  cellSize: number;
}>();

const emit = defineEmits<{
  cellClick: [position: IPosition];
}>();

const containerStyle = computed<StyleValue>(() => {
  const { sizeX, sizeY, cellSize } = p;
  return {
    width: sizeX * cellSize + 'px',
    height: sizeY * cellSize + 'px',
    gridTemplateColumns: `repeat(${sizeX}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${sizeY}, ${cellSize}px)`,
  }
});

const cellSizePx = computed(() => p.cellSize + 'px');

// n = 0, 1, 2, 3, ...
function cellPos(n: number): IPosition {
  const x = n % p.sizeX;
  const y = Math.floor(n / p.sizeX);
  return { x, y };
}

const cells = computed(() => {
  const { sizeX, sizeY } = p;
  const arr: IPosition[] = [];
  for (let i = 0; i < sizeX * sizeY; i++) {
    arr.push(cellPos(i));
  }
  return arr;
})

const cellClass = (pos: IPosition) => {
  const { x, y } = pos;
  return (x + y) % 2 === 1 ? 'dark-cell' : 'light-cell'
}

</script>

<style scoped>
.map-grid {
  position: relative;
  display: grid;
}

.cell {
  min-width: v-bind('cellSizePx');
  max-width: v-bind('cellSizePx');
  min-height: v-bind('cellSizePx');
  max-height: v-bind('cellSizePx');
}

.light-cell {
  background-color: #f8f8f8;
}

.dark-cell {
  background-color: #cccccc;
}
</style>

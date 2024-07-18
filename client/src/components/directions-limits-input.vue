<template>
  <div class="directions-limits-input">
    <input class="block" type="number" v-model="model[Direction.TopLeft]" />
    <input class="block" type="number" v-model="model[Direction.Top]" />
    <input class="block" type="number" v-model="model[Direction.TopRight]" />
    <input class="block" type="number" v-model="model[Direction.Left]" />
    <div class="block center">
      <slot />
    </div>
    <input class="block" type="number" v-model="model[Direction.Right]" />
    <input class="block" type="number" v-model="model[Direction.BottomLeft]" />
    <input class="block" type="number" v-model="model[Direction.Bottom]" />
    <input class="block" type="number" v-model="model[Direction.BottomRight]" />
  </div>
</template>

<script setup lang="ts">
import { Direction, IDirectionsLimitsMap } from '~/entities';

defineProps<{
  model: IDirectionsLimitsMap;
}>();

</script>

<style scoped>
.directions-limits-input {
  aspect-ratio: 1;
  --border: 1px solid lightgray;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
}

.block {
  width: 100%;
  height: 100%;
}

.block.center {
  border: var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
}

.block:nth-child(2), .block:nth-child(8) {
  border-left: var(--border);
  border-right: var(--border);
}

.block:nth-child(4), .block:nth-child(6) {
  border-top: var(--border);
  border-bottom: var(--border);
}

input {
  outline: none;
  border: none;
  text-align: center;
  font-size: inherit;
}

/* Убираю стрелки +- для инпута */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>

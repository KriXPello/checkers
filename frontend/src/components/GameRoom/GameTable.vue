<template>
  <div class="game-table" :style="{ '--columns-count': table.width }">
    <div
      v-for="n in table.width * table.height"
      :class="cellClass(n - 1) /* n в v-for начинается с 1 */"
    >

    </div>

    <div
      v-for="unit in units"
      :key="unit.id"
      class="unit"
      :class="unitClass(unit)"
      :style="unitStyle(unit)"
    >

    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type StyleValue } from 'vue';
import { GameSide, UnitType, type IGameSnapshot, type IUnit } from '#interfaces';
import { createTable, Game } from '#entities'
import { roomData, userData } from '@/modules';

const p = defineProps<{
  snapshot: IGameSnapshot,
}>();

const { config, units } = p.snapshot;

const game = computed(() => Game.load(p.snapshot));
const availableSteps = computed(() => game.value.findAvailableSteps(game.value.turnOf));
const table = computed(() => createTable(config.tableType));

// n = 0, 1, 2, 3, ...
const cellClass = (n: number) => {
  const x = n % table.value.width;
  const y = Math.floor(n / table.value.height);

  return (x + y) % 2 === 0 ? 'dark-cell' : 'light-cell'
}

const unitStyle = (unit: IUnit): StyleValue => {
  const { side, position } = unit;
  const [x, y] = position;

  return {
    '--x-pos': x,
    '--y-pos': y,
    backgroundColor: side === GameSide.Top ? '#EF7562' : '#445E93',
  }
}

const unitClass = (unit: IUnit) => {
  const { id, type } = unit;

  const unitSteps = availableSteps.value[id];

  const currentActor = roomData.value!.actors[game.value.turnOf];

  return {
    'unavailable-unit': currentActor?.id != userData.id || !unitSteps?.length,
    'special-unit': type == UnitType.Special,
  }
}

</script>

<style scoped>
.game-table {
  position: relative;

  --columns-count: 1;
  --side: calc(100% / var(--columns-count));

  width: 100%;
  min-width: calc(30px * var(--columns-count));
  max-width: calc(50px * var(--columns-count));
  aspect-ratio: 1;

  display: grid;
  grid-template-columns: repeat(var(--columns-count), var(--side));
  grid-auto-rows: var(--side);
}

.light-cell {
  background-color: #f0f2ef;
}

.dark-cell {
  background-color: #a69f98;
}

.unit {
  --x-pos: 0;
  --y-pos: 0;

  --scale: 0.9;
  --additional-offset: calc((1 - var(--scale)) * var(--side) / 2);

  position: absolute;
  left: calc(var(--side) * var(--x-pos) + var(--additional-offset));
  top: calc(var(--side) * var(--y-pos) + var(--additional-offset));

  width: calc(var(--side) * var(--scale));
  height: calc(var(--side) * var(--scale));

  border-radius: 50%;
  transition: all 200ms;
  cursor: pointer;
}

.unavailable-unit {
  cursor: not-allowed;
  opacity: 0.8;
}

.special-unit::after {
  width: 100%;
  height: 100%;
  content: '♛';
  color: 'black';
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

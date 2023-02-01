<template>
  <div
    class="game-table"
    :style="{ '--columns-count': table.width }"
  >
    <div
      v-for="n in table.width * table.height"
      :class="cellClass(n - 1) /* n в v-for начинается с 1 */"
    ></div>

    <ActiveCell
      v-for="unit in snapshot.units"
      :key="unit.id"
      :position="unit.position"
      :unavailable="!locked && stepOfCurrentUser && !availableSteps[unit.id]?.length"
      @click="selectUnit(unit)"
    >
    <Unit
        size="80%"
        :side="unit.side"
        :type="unit.type"
      />
    </ActiveCell>

    <template v-if="selectedUnit">
      <ActiveCell
        v-for="step in availableSteps[selectedUnit.id]"
        :key="step.destination.toString()"
        :position="step.destination"
        @click="selectStep(step)"
      >
        <Step
          size="40%"
          hide-icon
          :type="step.type"
        />
      </ActiveCell>
    </template>

    <div v-show="locked || !stepOfCurrentUser" class="lock-overlay"></div>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import type { IActors, IGameSnapshot, IStep, IUnit, IMove, IGameConfig} from '#interfaces';
import { createTable, Game } from '#entities';
import { Step, Unit } from '@/components';
import { userData } from '@/modules';
import ActiveCell from './ActiveCell.vue';

const p = defineProps<{
  snapshot: IGameSnapshot,
  config: IGameConfig,
  actors: IActors,
  locked: boolean,
}>();

const emit = defineEmits<{
  (event: 'move', move: IMove): void,
}>();

const selectedUnit = ref<null | IUnit>(null);

const availableSteps = computed(() => {
  const game = Game.load(p.snapshot, p.config);
  return game.findAvailableSteps(game.turnOf);
});
const table = computed(() => createTable(p.config.tableType));

const stepOfCurrentUser = computed(() => p.actors[p.snapshot.turnOf]?.id === userData.id);

watchEffect(() => {
  selectedUnit.value = p.snapshot.lockedUnit ?? null;
})

// n = 0, 1, 2, 3, ...
const cellClass = (n: number) => {
  const x = n % table.value.width;
  const y = Math.floor(n / table.value.height);

  return (x + y) % 2 === 0 ? 'dark-cell' : 'light-cell'
}

const selectUnit = (unit: IUnit) => {
  selectedUnit.value = selectedUnit.value?.id === unit.id ? null : unit;
}

const selectStep = (step: IStep) => {
  if (selectedUnit.value) {
    emit('move', {
      from: selectedUnit.value.position,
      to: step.destination,
    });
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
  background-color: #f8f8f8;
}

.dark-cell {
  background-color: #cccccc;
}

.lock-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>

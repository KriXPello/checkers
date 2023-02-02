<template>
  <div class="move-settings-container">
    <div
      v-for="(sideTitle, side) in sides"
      class="units-group"
    >
      <span class="side-title single-line-text">{{ sideTitle }}</span>
      <template v-if="side === GameSide.Bottom">
        <div class="symmetry-row">
          <MyButton
            class="symmetry-button"
            @click="applySymmetry(mirror)"
          >
            Зеркальная симметрия
          </MyButton>
          <Tip>
            <div class="tip">Если верхняя шашка может двигаться вправо вниз, то нижняя - вправо вверх</div>
          </Tip>
        </div>

        <div class="symmetry-row">
          <MyButton
            class="symmetry-button"
            @click="applySymmetry(central)"
          >
            Центральная симметрия
          </MyButton>
          <Tip>
            <div class="tip">Если верхняя шашка может двигаться вправо вниз, то нижняя - влево вверх</div>
          </Tip>
        </div>

      </template>

      <div
        v-for="unitType in units"
        class="directions-group"
      >
        <Unit :side="side" :type="unitType" size="30px" />

        <DirectionsGrid
          v-for="stepType in steps"
          v-model="settings[side][unitType][stepType]"
        >
          <Step :type="stepType" size="60%" />
        </DirectionsGrid>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Direction, GameSide, IMoveSettings, StepType, UnitType } from '#interfaces';
import { reactive, watch } from 'vue';
import { MyButton, Step, Unit, Tip } from '../common';
import DirectionsGrid from './DirectionsGrid.vue';

const p = defineProps<{
  modelValue: IMoveSettings,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: IMoveSettings): void,
}>();

const settings = reactive(p.modelValue);

watch(settings, (newSettings) => {
  emit('update:modelValue', newSettings);
})

const sides = {
  [GameSide.Top]: 'Верхняя сторона',
  [GameSide.Bottom]: 'Нижняя сторона',
}

const units = [
  UnitType.Basic,
  UnitType.Special,
]

const steps = [
  StepType.Move,
  StepType.Attack,
]

type SymmetryMap = Record<Direction, Direction>;

const mirror: SymmetryMap = {
  [Direction.TopLeft]: Direction.BottomLeft,
  [Direction.Top]: Direction.Bottom,
  [Direction.TopRight]: Direction.BottomRight,
  [Direction.Right]: Direction.Right,
  [Direction.BottomRight]: Direction.TopRight,
  [Direction.Bottom]: Direction.Top,
  [Direction.BottomLeft]: Direction.TopLeft,
  [Direction.Left]: Direction.Left,
}

const central: SymmetryMap = {
  [Direction.TopLeft]: Direction.BottomRight,
  [Direction.Top]: Direction.Bottom,
  [Direction.TopRight]: Direction.BottomLeft,
  [Direction.Right]: Direction.Left,
  [Direction.BottomRight]: Direction.TopLeft,
  [Direction.Bottom]: Direction.Top,
  [Direction.BottomLeft]: Direction.TopRight,
  [Direction.Left]: Direction.Right,
}

const applySymmetry = (symmetry: SymmetryMap) => {
  const { bottom, top } = settings;

  for (const unitType of units) {
    for (const stepType of steps) {
      for (const dir in symmetry) {
        const direction = dir as Direction;
        const symmetricDirection = symmetry[direction];

        bottom[unitType][stepType][symmetricDirection] = top[unitType][stepType][direction];
      }
    }
  }
}

</script>

<style scoped>
.move-settings-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.units-group {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.side-title {
  font-weight: 500;
}

.symmetry-row {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.symmetry-button {
  max-width: 180px;
}

.tip {
  width: 200px;
  padding: 8px;
}

.directions-group {
  width: 100%;
  padding: 8px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.directions-group:nth-child(even) {
  border-bottom: 1px solid lightgray;
}
</style>

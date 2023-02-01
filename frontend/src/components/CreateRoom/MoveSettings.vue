<template>
  <div class="move-settings-container">
    <div
      v-for="(sideTitle, side) in sides"
      class="units-group"
    >
      <span class="side-title single-line-text">{{ sideTitle }}</span>
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
import { GameSide, IMoveSettings, StepType, UnitType } from '#interfaces';
import { ref, watch } from 'vue';
import { Step, Unit } from '../common';
import DirectionsGrid from './DirectionsGrid.vue';

const p = defineProps<{
  modelValue: IMoveSettings,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: IMoveSettings): void,
}>();

const settings = ref(p.modelValue);

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

</script>

<style scoped>
.move-settings-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.side-title {
  font-weight: 500;
}

.units-group {
  width: 100%;
  display: flex;
  flex-direction: column;
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

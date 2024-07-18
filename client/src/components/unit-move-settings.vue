<template>
  <div class="unit-move-settings">
    <DirectionsLimitsInput :model="model[StepType.Move]">
      <StepFigure class="step-type" :type="StepType.Move" />
    </DirectionsLimitsInput>
    <DirectionsLimitsInput :model="model[StepType.Attack]">
      <StepFigure class="step-type" :type="StepType.Attack" />
    </DirectionsLimitsInput>
  </div>
</template>

<script setup lang="ts">
import { IUnitStepSettingsMap, StepType } from '~/entities';
import DirectionsLimitsInput from './directions-limits-input.vue';
import StepFigure from './step-figure.vue';

defineProps<{
  model: IUnitStepSettingsMap,
}>();
</script>

<style scoped>
.unit-move-settings {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.step-type {
  width: 60%;
}
</style>

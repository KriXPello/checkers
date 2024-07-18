<template>
  <div class="step-figure">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { StepType } from "~/entities";
import { stepColors } from "~/constants";
import { computed } from "vue";

type Props = {
  type: StepType;
}
const p = defineProps<Props>();

const bgColor = computed(() => stepColors[p.type]);

</script>

<style scoped>
.step-figure {
  aspect-ratio: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background-color: v-bind('bgColor');
}
</style>

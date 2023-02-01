<template>
  <div
    class="step-container"
    :style="{
      '--size': size,
      backgroundColor: stepColors[type],
    }"
    :title="type === StepType.Attack ? 'Атака' : 'Движение'"
  >
    <template v-if="!hideIcon">
      <svg
        v-if="type === StepType.Attack"
        viewBox="13.768 27.936 214.497 213.077"
        width="50%"
        height="50%"
      >
        <path :fill="stepIconColors[type]"  d="M 71.28 110.529 L 133.368 43.612 C 136.499 41.367 145.196 27.755 152.34 28.435 L 212.358 28.09 C 224.064 26.646 228.756 35.621 228.225 43.612 L 225.864 98.452 C 225.615 105.398 223.692 106.856 217.58 112.769 C 211.468 118.682 145.644 184.001 145.644 184.001 C 157.46 193.255 161.461 204.681 151.368 213.611 L 137.756 225.516 C 134.841 228.817 126.882 228.49 123.991 225.555 L 106.205 208.449 C 101.946 205.199 96.564 205.484 91.965 210.604 L 68.52 235.396 C 64.453 239.344 49.932 246.102 39.546 234.706 L 18.505 214.01 C 12.721 209.512 11.679 195.662 18.505 188.485 L 43.966 161.949 C 48.67 157.111 50.039 152.68 42.916 147.841 L 30.043 137.543 C 26.295 133.957 27.361 125.297 30.296 121.736 L 42.995 108.115 C 50.828 100.589 65.481 103.958 71.28 110.529 Z"></path>
        <path :fill="stepColors[type]" d="M 101.979 140.194 L 174.071 63.963 C 186.035 53.039 200.427 70.132 191.317 78.45 L 118.191 156.406 L 101.979 140.194 Z"></path>
      </svg>

      <svg
        v-if="type === StepType.Move"
        width="60%"
        height="60%"
        viewBox="0 0 24 24"
        id="Layer_1"
        data-name="Layer 1"
        :fill="stepIconColors[type]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :stroke="stepIconColors[type]"
          d="M19.64,9.14C19.64,15.82,12,22.5,12,22.5S4.36,15.82,4.36,9.14a7.64,7.64,0,0,1,15.28,0Z"
        />
        <circle
          :stroke="stepColors[type]"
          stroke-width="2px"
          cx="12"
          cy="9.14"
          r="2.86"
        />
      </svg>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { StepType } from "#interfaces";
import { stepColors, stepIconColors } from "@/constants";

defineProps<{
  type: StepType;
  size: string;
  hideIcon?: boolean;
}>();
</script>

<style scoped>
.step-container {
  --size: 30px;

  width: var(--size);
  aspect-ratio: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
}
</style>

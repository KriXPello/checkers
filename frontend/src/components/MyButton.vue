<template>
  <button
    class="base"
    :class="computedClasses"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  disabled: Boolean,
})

const computedClasses = computed(() => {
  if (props.disabled) {
    return ['disabled'];
  }

  return ['active']
})

</script>

<style scoped>
.base {
  height: 30px;
  outline: none;
  border: solid 1px lightgray;

  transition: 200ms;
}

.enabled {
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
}
.enabled:hover {
  box-shadow: 0 1px 4px lightgray;
}
.enabled:active {
  transform: scale(0.98, 0.98);
}

.disabled {
  background-color: lightgray;
  border-radius: 4px;
  cursor: default;
}
</style>

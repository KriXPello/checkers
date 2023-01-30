<template>
  <button
    class="base"
    :class="computedClasses"
    @click="emitClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const p = defineProps<{
  disabled?: boolean,
}>()

const emit = defineEmits(['click'])

const computedClasses = computed(() => {
  if (p.disabled) {
    return ['disabled'];
  }

  return ['enabled']
})

const emitClick = () => {
  if (!p.disabled) {
    emit('click')
  }
}

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
  box-shadow: 0 0 0 lightgray;
}

.disabled {
  background-color: lightgray;
  border-radius: 4px;
  cursor: default;
}
</style>

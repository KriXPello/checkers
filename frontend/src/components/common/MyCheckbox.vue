<template>
  <div class="my-checkbox-container">
    <input
      type="checkbox"
      v-model="value"
    >

    <span v-if="label" class="label single-line-text">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  modelValue: any,
  label?: string,
  type?: HTMLInputElement['type'],
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>()

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped>
.my-checkbox-container {
  position: relative;
  height: 20px;
  display: flex;
  flex-direction: row;
  gap: 8px;
}

input {
  width: 20px;
  border-radius: 8px;
}

.label {
  font-size: 14px;
}
</style>

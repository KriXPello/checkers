<template>
  <div class="my-input-container">
    <input
      :class="extraClass"
      v-model="text"
      @focusout="wasTouched = true"
    >
    <span v-if="label">{{ label }}{{ required ? '*' : null }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type StyleValue, watch } from 'vue';

const props = defineProps<{
  modelValue: any,
  label?: string,
  type?: HTMLInputElement['type'],
  required?: boolean,
  error?: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void,
}>()

const wasTouched = ref(false);

const extraClass = computed(() => {
  const requiredAndEmpty = props.required && wasTouched.value && !props.modelValue

  return {
    error: props.error || requiredAndEmpty,
  }
})

const text = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

watch(text, (newValue) => {
  if (!newValue) {
    wasTouched.value = false;
  }
})
</script>

<style scoped>
.my-input-container {
  position: relative;
  height: 30px;
}

input {
  height: 100%;
  width: 100%;
  padding: 4px;
  border: solid 1px lightgray;
  font-size: 14px;
  border-radius: 8px;
  outline: none;
}

.error {
  border: solid 1px var(--error-color);
}

span {
  position: absolute;
  top: 0;
  left: 8px;
  transform: translateY(-50%);
  padding: 0 2px;
  background-color: white;
  border-radius: 4px;
  font-size: 12px;
  line-height: 13px;
  pointer-events: none;
}
</style>

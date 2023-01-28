<template>
  <div class="table-container">
    <div class="table" :style="{ '--columns-count': table.width }">
      <div v-for="n in table.width * table.height">
        {{ n % table.width }} {{ Math.floor(n / (table.height + 1)) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { IGameSnapshot } from '#interfaces';
import { createTable } from '#entities'

const p = defineProps<{
  snapshot: IGameSnapshot,
}>();

const { config, units } = p.snapshot;

const table = computed(() => createTable(config.tableType));

</script>

<style scoped>
.table-container {
  width: 100%;
}

.table {
  width: 100%;
  aspect-ratio: 1;
  display: grid;

  --columns-count: 1;
  --side: calc(100% / var(--columns-count));

  grid-template-columns: repeat(var(--columns-count), var(--side));
  grid-auto-rows: var(--side);
}
</style>

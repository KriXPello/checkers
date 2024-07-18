<template>
  <main class="page">
    <div class="content-wrapper">
      <h2>Настройки игрового поля</h2>
      <MapGrid
        :size-x="mapSettings.sizeX"
        :size-y="mapSettings.sizeY"
        :cell-size="30"
      />

      <h2>Настройки правил игры</h2>
      <label class="checkbox-label">
        <input type="checkbox" v-model="gameSettings.multipleAttacks" />
        Атаки подряд
      </label>
      <label class="checkbox-label">
        <input type="checkbox" v-model="gameSettings.mustBeat" />
        Обязательная атака
      </label>

      <h2>Настройки направлений и дальности ходов</h2>
      <h3>Верхняя сторона</h3>
      <div class="units-move-settings-block">
        <UnitFigure class="figure-preview" :side="GameSide.Top" :type="UnitType.Basic" />
        <UnitMoveSettings :model="gameSettings.moveSettings[GameSide.Top][UnitType.Basic]" />
        <UnitFigure class="figure-preview" :side="GameSide.Top" :type="UnitType.Special" />
        <UnitMoveSettings :model="gameSettings.moveSettings[GameSide.Top][UnitType.Special]" />
      </div>
      <h3>Нижняя сторона</h3>
      <div class="units-move-settings-block">
        <UnitFigure class="figure-preview" :side="GameSide.Bottom" :type="UnitType.Basic" />
        <UnitMoveSettings :model="gameSettings.moveSettings[GameSide.Bottom][UnitType.Basic]" />
        <UnitFigure class="figure-preview" :side="GameSide.Bottom" :type="UnitType.Special" />
        <UnitMoveSettings :model="gameSettings.moveSettings[GameSide.Bottom][UnitType.Special]" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GameSide, IGameSettings, IMapSettings, UnitType } from '~/entities';
import MapGrid from '~/components/map-grid.vue';
import UnitFigure from '~/components/unit-figure.vue';
import UnitMoveSettings from '~/components/unit-move-settings.vue';
import { defaultMoveSettings, generateInitialUnits } from '~/utils';

const mapSettings = ref<IMapSettings>({
  sizeX: 8,
  sizeY: 8,
  initialUnits: generateInitialUnits(8, 8),
});

const gameSettings = ref<IGameSettings>({
  multipleAttacks: true,
  mustBeat: true,
  moveSettings: defaultMoveSettings(20),
});
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.checkbox-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.units-move-settings-block {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  justify-items: center;
  gap: 16px 32px;
}

.figure-preview {
  width: 50px;
}
</style>

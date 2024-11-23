<script setup lang="ts">
import { defineProps } from 'vue';

interface TableColumn {
  key: string;
  title: string;
  width?: string;
}

interface TableRow {
  id: string | number;
  cells: Record<string, { display: string; title: string; textColor?: string }>;
  backgroundColor?: string;
}

const props = defineProps<{
  columns: TableColumn[];
  rows: TableRow[];
}>();
</script>

<template>
  <div class="table-container">
    <!-- En-tête -->
    <div class="table-header">
      <div
        v-for="column in columns"
        :key="column.key"
        class="table-header-cell"
        :style="{ width: column.width || 'auto' }"
      >
        {{ column.title }}
      </div>
    </div>

    <!-- Corps -->
    <div class="table-body">
      <div
        v-for="row in rows"
        :key="row.id"
        class="table-row"
        :style="{ backgroundColor: row.backgroundColor || '#fff' }"
      >
        <div
          v-for="column in columns"
          :key="column.key"
          class="table-cell"
          :style="{ color: row.cells[column.key]?.textColor || '#333', width: column.width || 'auto' }"
          :title="row.cells[column.key]?.title"
        >
          {{ row.cells[column.key]?.display }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Conteneur général */
.table-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* Header */
.table-header {
  display: flex;
  padding: 12px 16px;
  background: linear-gradient(90deg, #5e60ce, #7400b8);
  color: white;
  border-radius: 8px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1rem;
  text-align: center; /* Centrer le texte */
}

.table-header-cell {
  flex-grow: 1;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center;    /* Centrer verticalement */
}

/* Corps */
.table-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.table-row:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.table-cell {
  flex-grow: 1;
  padding: 0 8px;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center; /* Centrer le texte dans les cellules */
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center;    /* Centrer verticalement */
}
</style>

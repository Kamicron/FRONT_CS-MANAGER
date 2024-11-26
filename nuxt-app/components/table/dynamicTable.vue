<template>
  <div class="table">
    <div class="table__header">
      <div v-for="column in columns" :key="column.key" class="table__header-cell"
        :style="{ width: column.width || 'auto' }">
        <div class="table__header-title" @click="toggleSort(column.key)">
          {{ column.title }}

          <i v-if="sortColumn === column.key"
            :class="sortOrder === 'asc' ? 'fa-duotone fa-regular fa-chevron-up' : 'fa-duotone fa-regular fa-chevron-down'">
          </i>
        </div>
      </div>
    </div>

    <div class="table__body">
      <div v-for="row in filteredAndSortedRows" :key="row.id" class="table__row"
        :style="{ backgroundColor: row.backgroundColor || '#fff' }" @click="handleRowClick(row.id)">
        <div v-for="column in columns" :key="column.key" class="table__cell"
          :style="{ color: row.cells[column.key]?.textColor || '#333', width: column.width || 'auto' }"
          :title="row.cells[column.key]?.title">
          {{ row.cells[column.key]?.display }}
        </div>
      </div>
    </div>

    <div class="table__footer">
      <div class="table__footer-elements">
        Total : {{ totalRows }} éléments
      </div>

      <div class="table__pagination">
        <button class="table__pagination-button" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
          Précédent
        </button>
        <button v-for="item in paginationItems" :key="item"
          :class="['table__pagination-button', { 'table__pagination-button--active': item === currentPage }]"
          :disabled="item === '...'" @click="typeof item === 'number' && goToPage(item)">
          {{ item }}
        </button>
        <button class="table__pagination-button" @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages">
          Suivant
        </button>
      </div>

      <div class="table__footer-settings">
        <span>
          Afficher :
          <select v-model="rowsPerPage" @change="updateRowsPerPage(rowsPerPage)" class="table__select">
            <option v-for="option in rowsPerPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          par page
        </span>
        <span>
          Aller à la page :
          <input v-model="goToInputPage" @keyup.enter="handleGoToPage" type="number" min="1" :max="totalPages"
            class="table__input" placeholder="Page" />
        </span>
        <button @click="emit('refresh')" class="table__refresh-button">Actualiser</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['refresh', 'clickRow']);

interface TableColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean; 
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

const currentPage = ref(1);
const rowsPerPageOptions = [10, 25, 50];
const rowsPerPage = ref(rowsPerPageOptions[0]);
const totalRows = computed(() => props.rows.length);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return props.rows.slice(start, end);
});

const totalPages = computed(() => Math.ceil(totalRows.value / rowsPerPage.value));

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const updateRowsPerPage = (value: number) => {
  rowsPerPage.value = value;
  currentPage.value = 1;
};

const goToInputPage = ref(''); 
const handleGoToPage = () => {
  const page = parseInt(goToInputPage.value, 10);
  if (!isNaN(page)) goToPage(page);
  goToInputPage.value = '';
};

const paginationItems = computed(() => {
  const items = [];

  if (totalPages.value <= 5) {
    for (let i = 1; i <= totalPages.value; i++) {
      items.push(i);
    }
  } else {
    if (currentPage.value !== 1) {
      items.push(1);
    }

    if (currentPage.value > 3) {
      items.push('...');
    }

    if (currentPage.value > 2) {
      items.push(currentPage.value - 1);
    }
    items.push(currentPage.value);
    if (currentPage.value < totalPages.value - 1) {
      items.push(currentPage.value + 1);
    }

    if (currentPage.value < totalPages.value - 2) {
      items.push('...');
    }

    if (currentPage.value !== totalPages.value) {
      items.push(totalPages.value);
    }
  }

  return items;
});

const handleRowClick = (id: string | number) => {
  console.log('Row clicked in DynamicTable:', id);
  emit('clickRow', id);
};

const sortColumn = ref<string | null>(null);
const sortOrder = ref<'asc' | 'desc'>('asc');

const filteredAndSortedRows = computed(() => {
  let result = [...props.rows];


  if (sortColumn.value) {
    result.sort((a, b) => {
      const valueA = (a.cells[sortColumn.value]?.display || '').toLowerCase().trim();
      const valueB = (b.cells[sortColumn.value]?.display || '').toLowerCase().trim();
      if (valueA < valueB) return sortOrder.value === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }


  return result;
});


const toggleSort = (columnKey: string) => {
  if (sortColumn.value === columnKey) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = columnKey;
    sortOrder.value = 'asc';
  }
};

</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  &__header {
    display: flex;
    padding: 12px 16px;
    background: linear-gradient(90deg, #5e60ce, #7400b8);
    color: white;
    border-radius: 8px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    text-align: center;
  }

  &__header-cell {
    flex-grow: 1;
    padding: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__row {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 12px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  }

  &__cell {
    flex-grow: 1;
    padding: 0 8px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: #f4f4f4;
    border-radius: 8px;

    &-elements {
      font-size: 0.9rem;
      color: #555;
    }

    &-settings {
      display: flex;
      gap: 16px;
      align-items: center;

      .table__select,
      .table__input {
        padding: 4px 8px;
        font-size: 0.9rem;
      }
    }
  }

  &__pagination {
    display: flex;
    gap: 8px;

    &-button {
      padding: 6px 12px;
      border: none;
      background: #5e60ce;
      color: white;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;

      &:hover:not(:disabled) {
        background: #6c63ff;
        transform: translateY(-2px);
      }

      &:disabled {
        background: #dcdcdc;
      }

      &--active {
        background: #7400b8;
      }
    }
  }
}
</style>

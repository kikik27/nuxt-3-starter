<script setup>
import { computed } from "vue";
import { useAuth } from "@/stores/auth";
const authStore = useAuth();

const emit = defineEmits();

const props = defineProps({
  totalPages: {
    default: 0,
  },
  totalItems: {
    default: 0,
  },
  previousPage: {
    default: 0,
  },
  nextPage: {
    default: 0,
  },
  perPage: {
    default: 10,
  },
  currentPage: {
    default: 1,
  },
});

const isLoading = computed(() => authStore.isLoading_data);
const current = computed(() => props.currentPage);
const currentPageChange = (value) => {
  emit("update:page", value);
};
</script>

// <PaginationCustom
//   :totalPages="metaData.totalPages"
//   :perPage="pagination.limit"
//   @update:page="
//     async (val) => {
//       pagination.current_page = val;
//       await getData();
//     }
//   "
//   :totalItems="metaData.count"
//   :previousPage="metaData.previous"
//   :nextPage="metaData.next"
//   :currentPage="metaData.current"
// />

<template>
  <nav
    class="mt-4 flex items-center justify-between"
    aria-label="Table navigation"
  >
    <span
      class="mb-4 block w-full text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto"
    >
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{
        (currentPage - 1) * perPage + 1
      }}</span>
      to
      <span class="font-semibold text-gray-900 dark:text-white">{{
        Math.min(currentPage * perPage, totalItems)
      }}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{
        totalItems
      }}</span>
    </span>

    <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="perPage"
      :max-pages-shown="2"
      v-model="current"
      :on-click="currentPageChange"
      paginate-buttons-class="btn"
      active-page-class="btn-active"
      back-button-class="back-btn"
      next-button-class="next-btn"
    >
      <template #prev-button>
        <Icon name="ooui:next-rtl" />
      </template>
      <template #next-button> <Icon name="ooui:next-ltr" /></template
    ></vue-awesome-paginate>
  </nav>
</template>
<style>
/* .pagination-container {
  display: flex;
  column-gap: 10px;
} */
/* .paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
} */

.btn {
  height: 32px;
  width: 32px;
  margin-inline: 4px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
  font-family: sans-serif;
  font-size: small;
  color: #111928;
}
.back-btn {
  background-color: transparent;
  border: none;
}
.next-btn {
  background-color: transparent;
  border: none;
}

.btn-active {
  background-color: #d82e1d;
  border: 1px solid #d82e1d;
  color: white;
}
</style>

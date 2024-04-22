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

const currentPageChange = (value) => {
  emit("update:page", value);
};

</script>

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

    <ul class="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
      <li>
        <button
          @click="currentPageChange(previousPage)"
          :disabled="previousPage == null"
          :class="{ 'cursor-not-allowed': previousPage == null }"
          class="flex h-8 items-center justify-center rounded-l-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Previous</span>
          <Icon name="ooui:next-rtl" />
        </button>
      </li>

      <li v-if="isLoading">
        <button
          class="flex h-8 items-center justify-center border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Icon name="eos-icons:loading" />
        </button>
      </li>
      <li v-for="page in totalPages" :key="page" v-else>
        <button
          @click="currentPageChange(page)"
          :class="{
            'cursor-not-allowed bg-red-100 text-red-500': page === currentPage,
          }"
          :disabled="page === currentPage"
          class="flex h-8 items-center justify-center border border-gray-300 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          @click="currentPageChange(nextPage)"
          :disabled="nextPage == null"
          :class="{ 'cursor-not-allowed': nextPage == null }"
          class="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Next</span>
          <Icon name="ooui:next-ltr" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useAuth } from "@/stores/auth";
const authStore = useAuth();

const props = defineProps({
  headerNames: {
    type: Object,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
});

const isLoading = computed(() => authStore.isLoading_data);

const index_show_detail = ref(null);

watch(isLoading, (newVal) => {
  if (newVal) {
    index_show_detail.value = null;
  }
});
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table
      class="w-full rounded-lg bg-white text-sm text-black-900 dark:text-gray-400"
    >
      <thead
        class="h-11 border border-gray-200 bg-slate-50 px-6 py-3 text-black-900"
      >
        <tr>
          <th
            v-for="(header, index) in Object.keys(headerNames)"
            :key="index"
            class="whitespace-nowrap"
          >
            <!-- Use a slot for each header name -->
            <slot :name="`header-${header}`">{{ headerNames[header] }}</slot>
          </th>
          <slot name="Actions"></slot>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="h-[72px] border border-gray-200 px-6 py-3 text-slate-900"
        >
          <template v-if="!!!isLoading">
            <td
              v-if="index_show_detail == index"
              :colspan="Object.keys(headerNames).length"
              :class="{
                'cursor-pointer hover:bg-slate-100': !!$slots.detail_row_table,
              }"
              @click="
                !!$slots.detail_row_table &&
                  (index_show_detail =
                    index_show_detail === index ? null : index)
              "
            >
              <slot name="detail_row_table" :row="row" :index="index"> </slot>
            </td>
            <td
              v-for="(header, index2) in Object.keys(headerNames)"
              v-else
              :key="index2"
              :data-label="headerNames[header]"
              class="text-center"
            >
              <!-- Use a slot for each column -->
              <slot
                :name="header"
                :row="row"
                :index="index"
                :detail_action="
                  () => {
                    !!$slots.detail_row_table &&
                      (index_show_detail =
                        index_show_detail === index ? null : index);
                  }
                "
              >
                {{ row[header] }}
              </slot>
            </td>
          </template>
        </tr>
        <tr>
          <td v-if="!!isLoading" :colspan="Object.keys(headerNames).length">
            <div class="flex items-center justify-center">
              <span v-if="!!isLoading">Loading</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

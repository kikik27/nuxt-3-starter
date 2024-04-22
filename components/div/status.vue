<script setup>
import { defineProps } from "vue";

const props = defineProps({
  labels: {
    type: String,
    default: "consultancy",
  },
});

const color = computed(() => {
  switch (props.labels) {
    case "waiting":
      return "bg-[#FFF0DE] text-[#FF8A00]";
    case "approved":
      return "bg-[#D8FFE1] text-[#13D33D]";
    case "reject":
      return "bg-red-100 text-red-500";
  }
});

const label = computed(() => {
  switch (props.labels) {
    case "waiting":
      return "Menunggu";
    case "approved":
      return "Diterima";
    case "reject":
      return "Ditolak";
    case "done":
      return "Selesai";
  }
});
</script>
<template>
  <span :class="['rounded-md p-2.5 font-sans text-sm font-semibold', color]">
    {{ label }}
  </span>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  labels: {
    type: String,
    default: 'consultancy',
  },
})


const color = computed(() => {
  switch (props.labels) {
    case 'offline':
      return 'bg-[#E6E6E6] text-[#737373] border border-[#737373]'
    case 'online':
      return 'bg-[#E4FFF0] border border-[#3ABF74] text-[#3ABF74]'
  }
})

</script>
<template>
<span :class="['rounded-md p-2.5 font-sans text-sm font-semibold', color]">
    {{ props.labels }}
  </span>
</template>
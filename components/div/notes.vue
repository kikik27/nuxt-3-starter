
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
    case 'goal':
      return 'bg-blue-100 text-blue-700'
    case 'running':
      return 'bg-green-100 text-green-700'
    // case 'running': 
    //   return 'bg-purple-100 text-purple-700'
    case 'hold':
      return 'bg-red-100 text-red-700'
    case 'notStarted':
      return 'bg-yellow-100 text-yellow-700'
    // case 'inComplete':
    //   return 'bg-cyan-100 text-cyan-700'
  }
})

</script>
<template>
  <span :class="['p-2 rounded-md', color]">
    {{ props.labels }}
  </span>
</template>
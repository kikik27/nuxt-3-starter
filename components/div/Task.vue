
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
    case 'inProgres':
      return 'bg-blue-100 text-blue-700'
    case 'onTime':
      return 'bg-green-100 text-green-700'
    case 'todo':
      return 'bg-purple-100 text-purple-700'
    case 'drop':
      return 'bg-red-100 text-red-700'
    case 'overdue':
      return 'bg-yellow-100 text-yellow-700'
  }

})

</script>
<template>
  <span :class="['p-2 rounded-md', color]">
    {{ props.labels }}
  </span>
</template>
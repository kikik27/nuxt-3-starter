<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  labels: {
    type: Array,
    default: ['project', 'Product', 'Oppty', 'Other'],
  },
  title: {
    type: String,
    default: 'Nama Chart'
  },
  series: {
    type: Array,
    default: [{
    name: 'total task',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    colors: ['#E72F29', '#90CDF4', '#E72F29', '#90CDF4', '#E72F29', '#90CDF4', '#E72F29', '#90CDF4', '#E72F29']
  }, {
    name: 'total task complete',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    colors: ['#E72F29', '#90CDF4', '#E72F29', '#90CDF4', '#E72F29', '#90CDF4', '#E72F29', '#90CDF4', '#E72F29']
  }]
  },
})

const options = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 350
    },
                plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '80%',
        endingShape: 'rounded'
      },
    },
    colors: ['#E72F29', '#90CDF4'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: props.labels
    },
    yaxis: {
      title: {
        text: props.title
      }
    },
    fill: {
      opacity: 2
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' ' + props.title
        }
      }
    }
  }
})

</script>
<template>
  <ClientOnly>
    <apexchart :key="series" height="400" width="100%" :options="options" :series="series"></apexchart>
  </ClientOnly>
</template>
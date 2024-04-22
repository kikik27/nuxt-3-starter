<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  labels: {
    type: Array,
    default: ["Pertemuan", "Konseling"],
  },
  series: {
    default: [7, 6, 7, 1],
  },
  title: {
    type: String,
    default: "Nama Chart",
  },
});

const options = computed(() => {
  return {
    chart: {
      width: "100%",
      height: "100%",
      type: "pie",
    },
    title: {
      text: props.title,
      align: "center",
      offsetY: -8,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "Montserrat",
        color: "#000000",
      },
    },
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontWeight: 600,
      itemMargin: {
        horizontal: 15,
        vertical: 0,
      },
    },
    labels: props.labels,
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#821C11", "#D82E1D"],
    plotOptions: {
      pie: {
        size: 320,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offsetX: 300,
          position: "bottom",
        },
      },
    },
  };
});
</script>
<template>
  <ClientOnly>
    <apexchart
      :key="series"
      width="380"
      :options="options"
      :series="series"
    ></apexchart>
  </ClientOnly>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  labels: {
    default: ["project", "Product", "Oppty", "Other"],
  },
  categorys: {
    default: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  title: {
    type: String,
    default: "Nama Chart",
  },
  appointments: {
    default: [],
  },
  counselings: {
    default: [],
  },
});

const series = computed(() => {
  return [
    {
      name: props.labels[0],
      data: props.appointments,
    },
    {
      name: props.labels[1],
      data: props.counselings,
    },
  ];
});

const options = computed(() => {
  return {
    title: {
      text: props.title,
      align: "left",
      margin: 32,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "Montserrat",
        color: "#000000",
      },
    },
    chart: {
      height: "320",
      type: "area",
      zoom: false,
      toolbar: {
        export: {
          csv: {
            columnDelimiter: ";",
            headerCategory: "Tanggal",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#821C11", "#D82E1D"],
    xaxis: {
      labels: {
        datetimeUTC: true,
        formatter: function (value) {
          return formatIndoDateV2(value);
        },
        style: {
          fontSize: "12px",
          fontFamily: "Montserrat, Arial, sans-serif",
          fontWeight: 500,
        },
      },
      categories: props.categorys,
    },
    tooltip: {
      x: {
        format: "dd/mm/yy HH:mm",
      },
    },
  };
});
</script>
<template>
  <ClientOnly>
    <!-- <apexchart
      :key="series"
      type="area"
      height="400"
      width="100%"
      :options="options"
      :series="series"
    ></apexchart> -->
    <apexchart
      type="area"
      height="320"
      :options="options"
      :series="series"
    ></apexchart>
  </ClientOnly>
</template>

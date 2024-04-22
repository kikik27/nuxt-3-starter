<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField, ErrorMessage } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

defineComponent(() => {
  Field, ErrorMessage;
});

const emit = defineEmits();
const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  maxDate: {
    default: null,
  },
  minDate: {
    default: null,
  },
  maxTime: {
    default: null,
  },
  minTime: {
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  timePicker: {
    type: Boolean,
    default: false,
  },
  disableWeekends: {
    default: false,
  },
  filters: {
    default: null,
  },
});
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

var valueChange = computed({
  get: () => inputValue.value,
  set: (val) => {
    handleChange(val);
    emit("update:value", val);
  },
});

const format = (date) => {
  if (!props.timePicker) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  } else {
    var date = new Date(date);

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var formattedDate =
      (day < 10 ? "0" : "") +
      day +
      "/" +
      (month < 10 ? "0" : "") +
      month +
      "/" +
      year;

    var hours = date.getHours();
    var minutes = date.getMinutes();

    var formattedTime =
      (hours < 10 ? "0" : "") +
      hours +
      "." +
      (minutes < 10 ? "0" : "") +
      minutes;

    var formattedDateTime = formattedDate + " - " + formattedTime;

    return formattedDateTime;
  }
};

</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      :class="{ 'text-red-500': !!errorMessage }"
      class="mb-2 block font-sans font-semibold capitalize text-gray-900 dark:text-white"
    >
      {{ label }}
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
    </label>
    <VueDatePicker
      :placeholder="placeholder"
      :input-class-name="
        !!errorMessage
          ? '!border-red-500 !pl-5 !font-medium !text-placeholder !font-sans !p-2.5 !text-sm !rounded-lg placeholder:border-red-active focus:!border-red-active focus:!outline-none focus:!ring-red-active'
          : '!p-2.5 !pl-5 !font-medium !text-placeholder !text-sm !font-sans !rounded-lg !border-form-border placeholder:border-red-active focus:!border-red-active focus:!outline-none focus:!ring-red-active'
      "
      :id="name"
      :enable-time-picker="timePicker"
      time-picker-inline
      :min-date="minDate"
      :max-date="maxDate"
      :min-time="minTime"
      :max-time="maxTime"
      v-model="valueChange"
      hours-increment="1"
      :filters="filters"
      :name="name"
      :format="format"
      :disabled="disabled"
      :disabled-week-days="!!disableWeekends ? [6, 0] : false"
    >
      <template #input-icon>
        <Icon
          v-if="!!icon"
          class="text-placeholder"
          name="uiw:date" /></template
    ></VueDatePicker>
    <span
      v-if="!!errorMessage"
      class="mt-2 text-xs text-red-600 dark:text-red-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

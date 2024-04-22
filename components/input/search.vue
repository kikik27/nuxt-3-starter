<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField, ErrorMessage, Field } from "vee-validate";
import * as yup from "yup";

defineComponent(() => {
  Field, ErrorMessage;
});

const emit = defineEmits();
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "akar-icons:search",
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  primary: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
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
    emit("update:search", val);
  },
});
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
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
      >
        <Icon name="akar-icons:search" class="text-placeholder" size="16px" />
      </div>
      <input
        :id="name"
        v-model="valueChange"
        :name="name"
        type="search"
        :class="{ 'border border-red-500': !!errorMessage }"
        class="block w-full rounded-lg border border-gray-100 bg-white p-2.5 pl-5 ps-10 font-sans text-sm font-medium text-placeholder placeholder:border-placeholder placeholder:text-placeholder focus:border-placeholder focus:outline-none focus:ring-0 disabled:bg-gray-50"
        :placeholder="placeholder"
      />
    </div>
    <span
      v-if="!!errorMessage"
      class="mt-2 text-xs text-red-600 dark:text-red-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

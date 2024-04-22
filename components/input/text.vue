<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField, ErrorMessage, Field } from "vee-validate";
import * as yup from "yup";

defineComponent(() => {
  Field, ErrorMessage;
});

const emit = defineEmits();
const props = defineProps({
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
  disabled: {
    type: Boolean,
    default: false,
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
    handleChange(val);
    emit("update:value", val);
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
    <input
      :id="name"
      v-model="valueChange"
      :name="name"
      :disabled="disabled"
      type="text"
      :class="{ 'border border-red-500': !!errorMessage }"
      class="block w-full rounded-lg border read-only:bg-gray-50 border-form-border p-2.5 pl-5 font-sans text-sm font-medium text-placeholder placeholder:border-red-active focus:border-red-active focus:outline-none focus:ring-red-active disabled:bg-gray-50"
      :placeholder="placeholder"
    />
    <span
      v-if="!!errorMessage"
      class="mt-2 text-xs text-red-600 dark:text-red-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

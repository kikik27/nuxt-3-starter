<script setup>
import Multiselect from "@vueform/multiselect";
import { computed, toRef, useSlots } from "vue";
import { useField, ErrorMessage, Field } from "vee-validate";
const emit = defineEmits();
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  labelOption: {
    type: String,
    default: "createdat",
  },
  valueOption: {
    type: String,
    default: "idposition",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function,
  },
});
const name = toRef(props, "name");
const {
  value: inputValue,
  errorMessage,
  errors,
  handleBlur,
  handleChange,
  meta,
} = useField(name);

var valueChange = computed({
  get: () => {
    return inputValue.value;
  },
  set: (val) => {
    handleChange(val);
    emit("update:value", val);
    if (props.onChange) {
      props.onChange(val);
    }
  },
});
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      :class="{ 'text-red-500': !!errorMessage }"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}
    </label>
    <multiselect
      :name="name"
      :max-height="1"
      :classes="{
        search: 'multiselect-search !bg-gray-50',
        dropdown: 'multiselect-dropdown !bg-gray-50',
      }"
      :class="{ '!border-red-500 focus:outline-none': !!errorMessage }"
      class="!rounded-lg border-gray-300 !text-sm text-gray-500 shadow hover:!border-gray-400"
      v-model="valueChange"
      :value-prop="valueOption"
      :placeholder="!!placeholder ? placeholder : `Input ${label}`"
      :disabled="disabled || readonly"
      :options="options"
      :label="labelOption"
      :searchable="true"
      @blur="handleBlur"
    >
    </multiselect>
    <span
      v-if="!!errorMessage"
      class="mt-2 text-xs text-red-600 dark:text-red-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>
<style src="@vueform/multiselect/themes/default.css"></style>

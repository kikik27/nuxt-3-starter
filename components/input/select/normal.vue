<script setup>
import Multiselect from "@vueform/multiselect";
import { useAuth } from "@/stores/auth";
import { computed, toRef, useSlots } from "vue";
import { useField, ErrorMessage, Field } from "vee-validate";
const emit = defineEmits();
const authStore = useAuth();
const props = defineProps({
  options: {
    default: [],
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

// <InputSelectNormal
//   @update:value="
//     (val) => {
//       handleSearch(val);
//     }
//   "
//   class="w-full md:w-1/3"
//   valueOption="id"
//   name="name"
//   labelOption="name"
//   placeholder="Cari berdasarkan nama siswa..."
//   :options="
//     async (val) => {
//       if (val !== null) {
//         await studentStore.getData(10, 1, val);
//         return studentStore.rows_data;
//       } else {
//         await studentStore.getData(10, 1);
//         return studentStore.rows_data;
//       }
//     }
//   "
// />

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
    <multiselect
      :classes="{
        container:
          'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer rounded-lg border border-gray-300 bg-white text-base leading-snug outline-none',
        containerOpen: 'rounded-b-none',
        containerOpenTop: 'rounded-t-none',
        containerActive: 'border border-red-active',
        placeholder:
          'flex items-center font-sans text-placeholder font-medium h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-5 text-gray-400 rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3.5',
        search:
          'w-full absolute inset-0 outline-none focus:ring-0 appearance-none box-border border-0 text-placeholder text-base font-sans bg-white rounded-lg pl-3.5 rtl:pl-0 rtl:pr-3.5',
        option:
          'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-4 px-3',
        optionPointed: ' text-black-900 bg-red-50',
        optionSelected: ' text-black-900 bg-red-100',
        optionDisabled: 'text-gray-300 cursor-not-allowed',
        optionSelectedPointed: 'text-black-900 bg-red-200 opacity-90',
        optionSelectedDisabled:
          'text-green-100 bg-green-500 bg-opacity-50 cursor-not-allowed',
      }"
      :name="name"
      :max-height="1"
      :class="{
        '!border-red-500 focus:outline-none': !!errorMessage,
        '!bg-gray-50': disabled,
      }"
      class="!text-sm text-gray-500"
      v-model="valueChange"
      :value-prop="valueOption"
      :placeholder="!!placeholder ? placeholder : `Pilih ${label}`"
      :disabled="disabled || readonly"
      :options="options"
      :label="labelOption"
      :clear-on-blur="false"
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
<style>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
}
</style>

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
    default: null,
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    required: false,
  },
  primary: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="mb-2 block font-sans font-semibold capitalize text-gray-900 dark:text-white"
    >
      {{ label }}
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
    </label>
    <input
      :id="name"
      :value="value"
      :name="name"
      type="text"
      class="block w-full rounded-lg border border-form-border p-2.5 pl-5 font-sans text-sm font-medium text-placeholder placeholder:border-red-active focus:border-red-active focus:outline-none focus:ring-red-active disabled:bg-gray-50"
      disabled
    />
  </div>
</template>

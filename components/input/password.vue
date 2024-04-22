<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField, ErrorMessage, Field } from "vee-validate";

defineComponent(() => {
  Field, ErrorMessage;
});

const emit = defineEmits();
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  autofocus: {
    type: Boolean,
    default: false,
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
    default: "",
  },
  icon: {
    type: String,
    default: "",
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
  get: () => inputValue.value,
  set: (val) => {
    handleChange(val);
    emit("update:value", val);
  },
});

const type = ref("password");

const typePassword = (val) => {
  type.value = val;
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
    <div class="relative w-full">
      <input
        :id="name"
        :class="{ 'border border-red-500': !!errorMessage }"
        v-model="valueChange"
        :name="name"
        :type="type"
        class="block w-full rounded-lg border border-form-border p-2.5 text-sm text-placeholder focus:border-red-active focus:outline-none focus:ring-red-active"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
      />
      <!-- <button v-if="type == 'text'" @click="typePassword('password')"
        class="absolute shadow top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-500 rounded-e-lg border border-gray-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        <Icon name="codicon:eye-closed" />
      </button>
      <button v-else @click="typePassword('text')"
        class="absolute shadow top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-500 rounded-e-lg border border-gray-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        <Icon name="iconoir:eye" />
      </button> -->
      <Icon
        name="iconoir:eye-closed"
        class="absolute end-3 top-3"
        v-if="type == 'text'"
        @click="typePassword('password')"
      />
      <Icon
        name="iconoir:eye"
        class="absolute end-3 top-3"
        v-else
        @click="typePassword('text')"
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

<script setup>
import { computed, toRef, useSlots } from "vue";
import { useField, ErrorMessage, } from "vee-validate";
// import BaseIcon from "@/components/BaseIcon.vue";
// import { mdiFile, mdiFileRemove, mdiFileUpload } from "@mdi/js";

const props = defineProps({
  value: {
    type: String,
    default: "",
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
    default: "mdi:file-document-outline",
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
  accept: {
    type: String,
    default: ".pdf",
  },
  comment: {
    type: String,
    default: "PDF, DOC, DOCX. (max: 10MB)",
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


const changeFile = async (event) => {
  let files = event.target.files[0];
  console.log(files)
  handleChange(files);
};

</script>

<template>
  <div class=" col-span-2">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
      <span v-if="primary">
        <span class="font-bold text-red-500">*</span>
      </span>
      {{ label }}
    </label>
    <input :disabled="disabled" :readonly="readonly" :name="name" @change="changeFile"
      class="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      id="file_input" type="file" :accept="accept">
    <small class="mt-1 text-xs text-gray-500 dark:text-gray-300" id="file_input_help">{{ comment }}</small>
    <ErrorMessage class="mt-2 text-xs text-red-600 dark:text-red-500" :name="name" />
  </div>
</template>
<script setup>
import { computed, toRef } from "vue";
import { useField, ErrorMessage, Field } from "vee-validate";
import vue3starRatings from "vue3-star-ratings";

defineComponent(() => {
  Field, ErrorMessage;
});

const emit = defineEmits();
const {
  value: inputValue,
  errorMessage,
  errors,
  handleBlur,
  handleChange,
  meta,z
} = useField("rating");

const ratingHandler = computed({
  get: () => inputValue.value,
  set(val) {
    handleChange(Math.floor(val + 1));
    emit("update:value", Math.floor(val + 1));
  },
});
</script>

<template>
  <div>
    <vue3starRatings
      v-model="ratingHandler"
      :starSize="42"
      name="rating"
      starColor="#ff9800"
      inactiveColor="#333333"
      :numberOfStars="5"
      :disableClick="false"
    />
    <span
      v-if="!!errorMessage"
      class="mt-2 text-xs text-red-600 dark:text-red-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

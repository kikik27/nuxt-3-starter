<script setup>
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "button",
  },
  icon: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "white",
  },
});
</script>

<template>
  <button
    :type="props.type"
    :class="{
      [`${props.class}`]: true,
      'rounded-lg bg-primary px-4 py-2.5 font-sans text-sm font-semibold capitalize text-white md:text-base ': true,
    }"
  >
    <Icon v-if="icon" :name="icon" size="20px" :color="iconColor" />
    {{ label }}
  </button>
</template>

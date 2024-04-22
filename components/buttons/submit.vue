<script setup>
import { useAuth } from "@/stores/auth";

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
  iconSize: {
    type: String,
    default: "18px",
  },
});

const auth = useAuth();
const isLoading = computed(() => auth.isLoading_data);
</script>

<template>
  <button
    :type="props.type"
    :class="{
      [`${props.class}`]: true,
      'cursor-wait opacity-75': !!isLoading,
      'rounded-lg bg-primary px-4 py-2.5 font-sans text-sm font-semibold capitalize text-white md:text-base ': true,
    }"
  >
    <slot v-if="!isLoading">
      <Icon v-if="icon" :name="icon" :color="iconColor" :size="iconSize" />
    </slot>
    <span v-if="isLoading"> <Icon name="eos-icons:loading" /></span>
    {{ !isLoading ? label : "" }}
  </button>
</template>

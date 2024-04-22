
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
  }
});

const auth = useAuth()
const isLoading = computed(() => auth.isLoading_data)

</script>

<template>
  <button :type="props.type" :class="{
    [`${props.class}`]: true,
  }">
    <slot>
      <Icon :name="props.icon" :color="props.iconColor" />
    </slot>
    <!-- <span v-if="isLoading">
      <Icon name="eos-icons:loading" /> Loading...
    </span> -->
    <!-- {{ !isLoading ? label : "" }} -->
    {{ props.label }}
  </button>
</template>
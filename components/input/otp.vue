<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  loops: {
    type: Number,
    default: "",
  },
  default: String,
});

const digits = reactive([]);
const emit = defineEmits(["update:otp"]);

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}

const isDigitsFull = () => {
  for (const elem of digits) {
    if (elem == null || elem == undefined) {
      return false;
    }
  }

  return true;
};

const handleKeyDown = (event, index) => {
  if (
    event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

    if (index != 0) {
      otpCont.value.children[index - 1].focus();
    }

    return;
  }

  if (new RegExp("^([0-9])$").test(event.key)) {
    digits[index] = event.key;

    if (index != props.loops - 1) {
      otpCont.value.children[index + 1].focus();
    }
  }

  if (isDigitsFull()) {
    emit("onUpdate:otp", digits.join(""));
    if (event.key === "Enter") {
      emit("onEnter:otp", true);
    }
  }
};

const otpCont = ref(null);
</script>

<template>
  <div class="flex flex-row" ref="otpCont">
    <input
      :onfocus="true"
      type="text"
      v-for="(el, ind) in loops"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      maxlength="1"
      required
      @keydown="handleKeyDown($event, ind)"
      class="mx-1.5 w-14 md:w-full text-center rounded-lg border-2 border-red-active font-semibold text-placeholder focus:border-red-active focus:ring-red-active"
    />
  </div>
</template>
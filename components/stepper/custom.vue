<script setup>
import { defineProps, ref, computed } from "vue";

const props = defineProps({
  initialStep: {
    type: Number,
    default: 0,
  },
  steps: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits();
const currentStep = ref(0);

watch(
  () => props.initialStep,
  (val) => {
    currentStep.value = val - 1;
  }
);

const progressWidth = computed(
  () => `${(currentStep.value / (props.steps.length - 1)) * 100}%`
);

const nextStep = () => {
  if (currentStep.value < props.steps.length - 1) {
    currentStep.value++;
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col justify-center gap-2">
      <div class="relative ml-4 mr-14 flex justify-between gap-2">
        <div class="absolute mt-3 h-2 w-full bg-red-50" />
        <div
          class="absolute mt-3 h-2 bg-primary"
          :style="{
            width: progressWidth,
            transition: 'width 0.2s ease-in-out',
          }"
        ></div>
      </div>
      <div class="relative flex justify-between">
        <div
          class="flex flex-col items-center justify-center gap-2"
          v-for="(step, index) in steps"
          :key="index"
        >
          <div
            class="h-4 w-4 rounded"
            :class="[
              {
                'bg-primary': currentStep >= index,
                'bg-red-200': currentStep < index,
              },
            ]"
          />
          <p
            class="font-sans text-xs font-normal capitalize"
            :class="[
              {
                ' text-gray-700': currentStep >= index,
                ' text-gray-400': currentStep < index,
              },
            ]"
          >
            {{ step }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-between">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="[
          {
            ' text-': index === currentStep,
            'step-completed': index < currentStep,
          },
        ]"
      ></div>
    </div>

    <div class="mt-4">
      <slot :step="steps[currentStep]" :stepIndex="currentStep"></slot>
    </div>
  </div>
</template>

<style scoped>
.step {
  flex: 1;
  text-align: center;
}

.step-active {
  font-weight: bold;
}

.step-completed {
  color: green;
}
</style>

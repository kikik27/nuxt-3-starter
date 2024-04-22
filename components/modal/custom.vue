<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
});

const emits = defineEmits(["close", "submit"]);

const closeModal = () => {
  emits("close", false);
};

const maxWidth = "max-w-md";
</script>
<template>
  <TransitionRoot appear :show="props.show" as="template">
    <Dialog as="div" class="relative z-50">
      <!-- Overlay -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black-900 bg-opacity-10" />
      </TransitionChild>

      <!-- Modal Content -->
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex h-full min-h-full w-full min-w-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="[
                'relative w-full transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle drop-shadow-sm transition-all',
                maxWidth,
              ]"
            >
              <!-- Tombol Silang -->
              <button
                @click="closeModal"
                type="button"
                class="absolute right-4 top-4 text-gray-400"
              >
                <Icon name="mingcute:close-circle-line" size="30px" />
              </button>

              <div class="my-6 text-center">
                <!-- Judul Modal -->
                <DialogTitle
                  as="h3"
                  class="font-sans text-2xl font-bold capitalize leading-6 text-gray-900"
                >
                  <slot name="title"></slot>
                </DialogTitle>
                <p
                  class="font-sans text-sm font-medium capitalize leading-6 text-gray-400"
                >
                  <slot name="subtitle"></slot>
                </p>
              </div>

              <div class="mt-6 max-h-[70vh] h-full overflow-y-auto">
                <slot name="body"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

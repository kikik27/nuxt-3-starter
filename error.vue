<template>
  <div id="error" class="w-screen h-screen bg-main bg-no-repeat">
    <div class="flex flex-col items-center justify-center p-12 gap-12 w-full h-full">
      <div class="bg-white shadow-lg w-full max-h-fit max-w-md rounded-3xl flex flex-col items-center justify-center py-12">
        <h1 class="text-center font-bold text-9xl text-red-500">
          {{ props.error.statusCode }}
        </h1>
        <div class="flex flex-col text-center justify-center py-6 px-6 gap-4">
          <h1 class=" text-lg font-semibold">
            {{ props.error.message }}
          </h1>
          <button class="bg-red-500 py-2 px-4 rounded-lg text-white" @click="handleError">Go To Home</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({
    redirect: '/',
  });
};
</script>
<style scoped>
#error {
  background-color: #EBF3FF;
}
</style>
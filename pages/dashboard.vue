<script setup>
definePageMeta({
  middleware: 'auth',
}
)
</script>
<template>
  <NuxtLayout>
    <template #body>
      <h1 class="text-primary">Dashboard</h1>
    </template>
  </NuxtLayout>
</template>
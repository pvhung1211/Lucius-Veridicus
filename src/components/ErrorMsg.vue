<script setup lang="ts">
defineProps<{
  error: string
}>()
</script>

<template>
  <span class="absolute text-red-500 text-xs pt-1">{{ error }}</span>
</template>

<style scoped>

</style>

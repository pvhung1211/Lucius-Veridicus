<script setup lang="ts">
import Card from '@/components/Card.vue'
import { useGetPostsQuery } from '@/services/post'

const postsQuery = useGetPostsQuery()
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Card v-for="post in postsQuery.data.value" :key="post.id" :post="post" />
  </div>
</template>

<style scoped>

</style>

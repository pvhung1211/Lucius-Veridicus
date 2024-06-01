<script setup lang="ts">
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
</script>

<template>
  <div class="create-post-editor">
    <div class="mb-6">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input id="large-input" type="text" class="block w-full p-4 text-gray-900 border border-gray-300 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div class="mb-6">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
      <CKEditor.component :editor="ClassicEditor" />
    </div>
    <div class="mb-6">
      <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Post
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>

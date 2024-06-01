<script setup lang="ts">
import DashboardIcon from '@/assets/dashboard.svg?component'
import LogoutIcon from '@/assets/logout.svg?component'
import ArticlesIcon from '@/assets/articles.svg?component'
import CreatePost from '@/assets/createPost.svg?component'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

const navs = [
  {
    title: 'Dashboard',
    href: '/',
    icon: DashboardIcon,
  },
  {
    title: 'Create Post',
    href: '/create-post',
    icon: CreatePost,
  },
  {
    title: 'Articles',
    href: '/articles',
    icon: ArticlesIcon,
  },
  {
    title: 'Logout',
    href: '',
    icon: LogoutIcon,
    onClick: () => {
      authStore.removeAuth()
      router.push('/login')
    },
  },
]
</script>

<template>
  <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
    </svg>
  </button>

  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="{ href, title, icon, onClick } in navs" :key="title">
          <RouterLink v-if="href" :to="href" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <component :is="icon" />
            <span class="ms-3">{{ title }}</span>
          </RouterLink>
          <div v-else class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" @click="onClick">
            <component :is="icon" />
            <span class="ms-3">{{ title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>

  <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <RouterView />
    </div>
  </div>
</template>

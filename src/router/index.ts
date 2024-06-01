import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// To ensure it is treated as a module, add at least one `export` statement

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/admin',
      name: 'admin',
      component: () => import('@/components/Layout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/admin/AdminView.vue'),
        },
        {
          path: 'create-post',
          name: 'create-post',
          component: () => import('@/views/admin/CreatePostView.vue'),
        },
        {
          path: 'articles',
          name: 'articles',
          component: () => import('@/views/public/ArticlesView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      beforeEnter: () => {
        const authStore = useAuthStore()
        if (authStore.authState.isLogged) {
          return '/'
        }
      },
    },
    {
      path: '/register',
      name: 'regsister',
      component: () => import('@/views/auth/RegisterView.vue'),
      beforeEnter: () => {
        const authStore = useAuthStore()
        if (authStore.authState.isLogged) {
          return '/'
        }
      },
    },

  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.authState.isLogged) {
    return '/login'
  }
})

export default router

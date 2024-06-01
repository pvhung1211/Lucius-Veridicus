import axios from 'axios'
import { API_URL } from '@/constants/api'
import { useAuthStore } from '@/stores/auth'

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.authState.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
)
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      // TODO refresh token

      const authStore = useAuthStore()
      authStore.removeAuth()
    }
    return Promise.reject(error)
  },
)

export default httpClient

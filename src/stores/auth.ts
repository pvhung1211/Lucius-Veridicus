import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { UserAuthenticationData } from '@/types/user'

function getDefaultValue(): UserAuthenticationData {
  return {
    isLogged: false,
    message: '',
    token: '',
    user: {
      email: '',
      password: '',
    },
  }
}

export const useAuthStore = defineStore('auth', () => {
  const authState = ref<UserAuthenticationData>(getDefaultValue())

  const setAuth = (authData: UserAuthenticationData) => {
    authState.value = authData
  }

  const removeAuth = () => {
    authState.value = getDefaultValue()
  }

  return { authState, setAuth, removeAuth }
}, {
  persist: true,
})

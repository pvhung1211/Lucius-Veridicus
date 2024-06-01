import { useMutation, useQuery } from '@tanstack/vue-query'
import { API_URL } from '@/constants/api'
import { ErrorType, type HttpError } from '@/types/error'
import type {
  CreateUserPayload,
  FetchUserPayload,
  UserAuthenticationData,
} from '@/types/user'
import httpClient from '@/utils/httpClient'
import { AppError } from '@/utils/appError'

export async function createUser(userInfo: CreateUserPayload) {
  try {
    const resp = await httpClient.post<UserAuthenticationData>('/register', userInfo)
    return resp.data
  }
  catch (error) {
    throw new AppError(error)
  }
}
export function useCreateUser() {
  return useMutation({
    mutationFn: (userInfo: CreateUserPayload) => createUser(userInfo),
  })
}

export async function fetchUser(loginData: FetchUserPayload) {
  try {
    const resp = await fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = (await resp.json()) as UserAuthenticationData

    if (!resp.ok) {
      const error: HttpError = {
        message: data.message,
        name: ErrorType.LOGIN_FAILED,
        status: resp.status,
      }
      throw error
    }

    return data
  }
  catch (error) {
    console.log(error)
    throw error
  }
}

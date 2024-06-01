import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export class AppError extends Error {
  response?: AxiosResponse

  constructor(error: unknown) {
    if (error instanceof Error) {
      super(error.message)
      this.stack = error.stack
      if (axios.isAxiosError(error)) {
        this.response = error.response
      }
    }
    else {
      super('An unknown error occurred')
    }
  }
}

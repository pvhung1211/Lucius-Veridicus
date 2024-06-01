<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useToast } from 'vue-toastification'
import ErrorMsg from '@/components/ErrorMsg.vue'
import type { FetchUserPayload } from '@/types/user'
import { fetchUser } from '@/services/user'
import type { HttpError } from '@/types/error'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
})

const toast = useToast()
const authStore = useAuthStore()
const { values, errors, defineField, validate } = useForm<FetchUserPayload>({ validationSchema: toTypedSchema(schema), validateOnMount: false })

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
})
const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false,
})

async function handleSubmit() {
  const { valid } = await validate()

  if (!valid) {
    return
  }

  try {
    const user = await fetchUser(values)

    authStore.setAuth(user)
    toast.success('You have been registered successfully!')
    router.push('/')
  }
  catch (error) {
    toast.error((error as HttpError)?.message || 'Something went wrong!')
  }
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-bind="emailAttrs" id="email" v-model="email" type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>
              <ErrorMsg v-if="errors.email" :error="errors.email" />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-bind="passwordAttrs" id="password" v-model="password" type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <ErrorMsg v-if="errors.password" :error="errors.password" />
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <RouterLink to="register">
                Register
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>

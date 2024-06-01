<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useToast } from 'vue-toastification'
import { computed, watch } from 'vue'
import ErrorMsg from '@/components/ErrorMsg.vue'
import { createUser, useCreateUser } from '@/services/user'
import router from '@/router'
import type { CreateUserForm } from '@/types/user'
import type { HttpError } from '@/types/error'

let currentPassword = ''
const schema = z.object({
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(6)
    .refine((value) => {
      currentPassword = value
      return true
    }),
  confirmPassword: z
    .string()
    .refine(value => value === currentPassword, 'Passwords do not match'),
})

const toast = useToast()
const createUserMutation = useCreateUser()

const { values, errors, defineField, meta } = useForm<CreateUserForm>({
  validationSchema: toTypedSchema(schema),
  validateOnMount: false,
})

const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false,
})
const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
})
const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false,
})
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword', {
  validateOnModelUpdate: false,
})

const hasError = computed(() => {
  const { email, confirmPassword, password } = errors.value
  return !!(meta.value.dirty && (email || password || confirmPassword))
})

async function handleSubmit() {
  const { confirmPassword, ...payload } = values

  createUserMutation.mutate(payload)
}

watch(() => createUserMutation.isSuccess.value, () => {
  toast.success('Registration successful! Please login to continue.')
  router.push('login')
})

watch(() => createUserMutation.isError.value, () => {
  toast.error('Registration failed! Please try again.')
})
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create an account
          </h1>

          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="handleSubmit"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your name</label>
              <input
                id="name"
                v-model="name"
                v-bind="nameAttrs"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Jon Snow"
                required
              >
              <ErrorMsg v-if="hasError && errors.name" :error="errors.name" />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label>
              <input
                id="email"
                v-model="email"
                v-bind="emailAttrs"
                type="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              >
              <ErrorMsg v-if="hasError && errors.email" :error="errors.email" />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                v-bind="passwordAttrs"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
              <ErrorMsg v-if="hasError && errors.password" :error="errors.password" />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Confirm password</label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                name="confirm-password"
                placeholder="••••••••"
                v-bind="confirmPasswordAttrs"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
              <ErrorMsg
                v-if="hasError && errors.confirmPassword"
                :error="errors.confirmPassword"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg v-if="createUserMutation.isPending.value" aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <RouterLink to="login">
                Login here
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>

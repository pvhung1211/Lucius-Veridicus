interface UserGeneralInformation {
  email: string
  password: string
}
export type FetchUserPayload = UserGeneralInformation

export type CreateUserPayload = UserGeneralInformation & {
  name: string
}
export type CreateUserForm = CreateUserPayload & {
  confirmPassword: string
}
export interface UserAuthenticationData {
  user: UserGeneralInformation
  token: string
  message: string
  isLogged: boolean
}
export interface LoginStatus { message: string, isLogged: boolean }

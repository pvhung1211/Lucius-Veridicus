export interface HttpError extends Error {
  status: number
}
export enum ErrorType {
  LOGIN_FAILED = 'LOGIN_FAILED',
  REGISTER_FAILED = 'REGISTER_FAILED',
}

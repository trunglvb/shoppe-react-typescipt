export interface IErrorResponseApi<T> {
  message: string
  data?: T //generic type
}
export interface ISuccessResponseApi<T> {
  message: string
  data: T //generic type
}

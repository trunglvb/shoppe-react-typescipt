import { IAuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_AUTH = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOG_OUT: 'logout',
  REFRESH_TOKEN: 'refresh-access-token'
}
export const registerAccount = (body: { email: string; password: string }) =>
  http.post<IAuthResponse>(URL_AUTH.REGISTER, body)

export const loginAccount = (body: { email: string; password: string }) =>
  http.post<IAuthResponse>(URL_AUTH.LOGIN, body)

export const logoutAccount = () => http.post(URL_AUTH.LOG_OUT)

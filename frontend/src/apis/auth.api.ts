import { IAuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<IAuthResponse>('/register', body)

export const loginAccount = (body: { email: string; password: string }) => http.post<IAuthResponse>('/login', body)

export const logoutAccount = () => http.post('/logout')

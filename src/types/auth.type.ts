import { IUser } from './user.type'
import { IResponseApi } from './utils.type'

export type IAuthResponse = IResponseApi<{
  access_token: string
  expires: string
  refresh_token?: string
  expires_refresh_token?: string
  user: IUser
}>

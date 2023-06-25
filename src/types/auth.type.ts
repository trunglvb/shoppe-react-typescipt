import { IUser } from './user.type'
import { ISuccessResponseApi } from './utils.type'

export type IAuthResponse = ISuccessResponseApi<{
  access_token: string
  expires: string
  refresh_token?: string
  expires_refresh_token?: string
  user: IUser
}>

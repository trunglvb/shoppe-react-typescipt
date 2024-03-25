import { IUser } from './user.type'
import { ISuccessResponseApi } from './utils.type'

export type IAuthResponse = ISuccessResponseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: IUser
}>

export type IRefreshTokenResponse = ISuccessResponseApi<{ access_token: string }>

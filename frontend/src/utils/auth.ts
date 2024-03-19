import { IUser } from 'src/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const saveRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

export const getAccessTokenFromLocalStorage = () => localStorage.getItem('accessToken') ?? ''

export const getRefreshTokenFromLocalStorage = () => localStorage.getItem('refreshToken') ?? ''

export const clearLocalStorage = () => {
  const clearLSEvent = new Event('clearLS')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('profile')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const saveProfileToLocalStorage = (user: IUser) => localStorage.setItem('profile', JSON.stringify(user))

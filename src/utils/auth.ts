import { IUser } from 'src/types/user.type'

export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}
export const getAccessTokenFromLocalStorage = () => localStorage.getItem('accessToken') ?? ''

export const clearLocalStorage = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('profile')
}

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const saveProfileToLocalStorage = (user: IUser) => localStorage.setItem('profile', JSON.stringify(user))

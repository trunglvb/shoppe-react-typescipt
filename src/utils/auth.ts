export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}
export const getAccessTokenFromLocalStorage = () => localStorage.getItem('accessToken') ?? ''

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem('accessToken')
}

import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import config from './config'
import userImage from 'src/assets/images/userImage.png'
import { IErrorResponseApi } from 'src/types/utils.type'

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

//FormError la kieu tra ve cua data
export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const isAxiosUnauthorizedError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export const isAxiosExpiredTokenError = <UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> => {
  return (
    isAxiosUnauthorizedError<IErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export const formatNumberToSocialStyle = (value: number) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}

export const rateSale = (original: number, sale: number) => {
  return Math.round((original - sale) / original) * 100 + '%'
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const getAvatarUrl = (avatarName?: string) => {
  return avatarName ? `${config.baseURL}images/${avatarName}` : userImage
}

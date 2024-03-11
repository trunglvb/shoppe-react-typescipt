import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { IAuthResponse } from 'src/types/auth.type'
import {
  getAccessTokenFromLocalStorage,
  clearLocalStorage,
  saveAccessTokenToLocalStorage,
  saveProfileToLocalStorage
} from './auth'
import path from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string // luu tren RAM
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //voi route can xac thuc, gui token len bang header voi key la authorization
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config?.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          this.accessToken = (response.data as IAuthResponse).data.access_token
          saveAccessTokenToLocalStorage(this.accessToken)
          saveProfileToLocalStorage(response.data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLocalStorage()
        }
        // toast.success(response?.data.message)
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = error.response?.data
          const message = data.message ?? error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLocalStorage()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http

import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { IAuthResponse } from 'src/types/auth.type'
import config from './config'
import {
  getAccessTokenFromLocalStorage,
  clearLocalStorage,
  saveAccessTokenToLocalStorage,
  saveProfileToLocalStorage,
  saveRefreshTokenToLocalStorage,
  getRefreshTokenFromLocalStorage
} from './auth'
import { URL_AUTH } from 'src/apis/auth.api'

class Http {
  instance: AxiosInstance
  private accessToken: string // luu tren RAM
  private refreshToken: string // luu tren RAM
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()

    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10, //10s
        'expire-refresh-token': 60 * 60
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
        if (url === URL_AUTH.LOGIN || url === URL_AUTH.REGISTER) {
          this.accessToken = (response.data as IAuthResponse).data.access_token
          this.refreshToken = (response.data as IAuthResponse).data.refresh_token
          saveAccessTokenToLocalStorage(this.accessToken)
          saveRefreshTokenToLocalStorage(this.refreshToken)
          saveProfileToLocalStorage(response.data.data.user)
        } else if (url === URL_AUTH.LOG_OUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }
        // toast.success(response?.data.message)
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = error.response?.data
          const message = data?.message ?? error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLocalStorage()
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    //this.instance.post tuong tu http.post
    this.instance.post(URL_AUTH.REFRESH_TOKEN)
  }
}

const http = new Http().instance

export default http

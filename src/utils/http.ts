import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { IAuthResponse } from 'src/types/auth.type'
import { removeAccessTokenFromLocalStorage, saveAccessTokenToLocalStorage } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = ''
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as IAuthResponse).data.access_token
          saveAccessTokenToLocalStorage(this.accessToken)
        } else if (url === '/logout') {
          this.accessToken = ''
          removeAccessTokenFromLocalStorage()
        }
        toast.success(response?.data.message)
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = error.response?.data
          const message = data.message ?? error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http

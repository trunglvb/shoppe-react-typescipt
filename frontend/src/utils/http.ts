import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { IAuthResponse, IRefreshTokenResponse } from 'src/types/auth.type'
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
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { IErrorResponseApi } from 'src/types/utils.type'

class Http {
  instance: AxiosInstance
  private accessToken: string // luu tren RAM
  private refreshToken: string // luu tren RAM
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null

    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24 * 7, // 7 ngày
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
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
        console.log('response', response)
        const { url } = response.config //goi lai api login neu loi token, path cua api
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
      (error: AxiosError) => {
        const config = error.response?.config || { headers: {}, url: '' }
        const url = config.url
        if (
          error.response?.status !== HttpStatusCode.UnprocessableEntity &&
          error.response?.status !== HttpStatusCode.Unauthorized
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any = error.response?.data
          const message = data?.message ?? error.message
          toast.error(message)
        }

        //loi 401
        if (isAxiosUnauthorizedError<IErrorResponseApi<{ name: string; message: string }>>(error)) {
          //trường hợp lỗi Token hết hạn và request đó không phải là request refreshTokenReq thì mới gọi refresh token
          //nếu request refresh token bị lỗi thì không tiến hành gọi nữa
          console.log(url)
          if (isAxiosExpiredTokenError(error) && url !== URL_AUTH.REFRESH_TOKEN) {
            //kiem tra de voi nhieu api loi cung luc thi chi goi refresh token mot lan
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  this.refreshTokenRequest = null
                })

            //loi thi goi resfeshTokenReq
            return this.refreshTokenRequest.then((access_token) => {
              //res la access_token duoc return trong handleRefreshToken

              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error?.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    //this.instance.post tuong tu http.post
    return this.instance
      .post<IRefreshTokenResponse>(URL_AUTH.REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((response) => {
        console.log('response', response)
        const { access_token } = response.data.data
        saveAccessTokenToLocalStorage(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        //xay ra loi khi refresh_token het han
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http

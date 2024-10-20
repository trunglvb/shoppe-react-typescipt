import {
  saveRefreshTokenToLocalStorage,
  saveAccessTokenToLocalStorage,
  getAccessTokenFromLocalStorage,
  saveProfileToLocalStorage,
  clearLocalStorage,
  getRefreshTokenFromLocalStorage,
  getProfileFromLocalStorage
} from './../auth'
import { describe, expect, it } from 'vitest'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzRhYjYzMWFmYzJlMWExZjk2ODA0MyIsImVtYWlsIjoidHJ1bmcubHZiMTIzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMTRUMTQ6NTk6NDkuOTgyWiIsImlhdCI6MTcyMzY0NzU4OSwiZXhwIjoxNzI0MjUyMzg5fQ.QMk2D-zwOu2cflZnMVAM-xtXHzYtxNGCDBJs241f8K0'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzRhYjYzMWFmYzJlMWExZjk2ODA0MyIsImVtYWlsIjoidHJ1bmcubHZiMTIzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMTRUMTQ6NTk6NDkuOTgyWiIsImlhdCI6MTcyMzY0NzU4OSwiZXhwIjoxNzM3NDcxNTg5fQ.TNxHnVrVs9yygnY0CVorQDrmfzu8e5PdpufR7EaQ8cc'

const profile =
  '{"_id":"6474ab631afc2e1a1f968043","roles":["User"],"email":"trung.lvb123@gmail.com","createdAt":"2023-05-29T13:40:51.982Z","updatedAt":"2024-08-05T14:46:15.619Z","__v":0,"avatar":"6ab1253d-ee56-4afd-aede-9a83bddb1e7e.webp","name":"baotrung","phone":"0395311252","address":"Thanh Hoa, Viet Nam","date_of_birth":"2001-11-02T17:00:00.000Z"}'

describe('saveAccessTokenToLocalStorage', () => {
  it('access_token saved to localstorage', () => {
    saveAccessTokenToLocalStorage(access_token)
    expect(localStorage.getItem('accessToken')).toBe(access_token)
  })
})

describe('saveRefreshTokenToLocalStorage', () => {
  it('refresh_token save to localstorage', () => {
    saveRefreshTokenToLocalStorage(refresh_token)
    expect(localStorage.getItem('refreshToken')).toBe(refresh_token)
  })
})

describe('getAccessTokenFromLocalStorage', () => {
  it('get access_token success', () => {
    saveAccessTokenToLocalStorage(access_token)
    expect(getAccessTokenFromLocalStorage()).toBe(access_token)
  })
})

describe('getRefreshTokenFromLocalStorage', () => {
  it('get refresh_token success', () => {
    saveRefreshTokenToLocalStorage(refresh_token)
    expect(getRefreshTokenFromLocalStorage()).toBe(refresh_token)
  })
})

describe('getProfileFromLocalStorage', () => {
  it('get profile success', () => {
    saveProfileToLocalStorage(JSON.parse(profile))
    expect(JSON.stringify(getProfileFromLocalStorage())).toEqual(profile)
  })
})
//dung toEqual de so sanh object nested

describe('clearLocalStorage', () => {
  it('clearLocalStorage success', () => {
    saveAccessTokenToLocalStorage(access_token)
    saveRefreshTokenToLocalStorage(refresh_token)
    saveProfileToLocalStorage(JSON.parse(profile))

    clearLocalStorage()

    expect(getAccessTokenFromLocalStorage()).toEqual('')
    expect(getRefreshTokenFromLocalStorage()).toEqual('')
    expect(getProfileFromLocalStorage()).toEqual(null)
  })
})

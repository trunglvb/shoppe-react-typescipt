import { describe, expect, it } from 'vitest'
import { saveAccessTokenToLocalStorage } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzRhYjYzMWFmYzJlMWExZjk2ODA0MyIsImVtYWlsIjoidHJ1bmcubHZiMTIzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMTRUMTQ6NTk6NDkuOTgyWiIsImlhdCI6MTcyMzY0NzU4OSwiZXhwIjoxNzI0MjUyMzg5fQ.QMk2D-zwOu2cflZnMVAM-xtXHzYtxNGCDBJs241f8K0'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzRhYjYzMWFmYzJlMWExZjk2ODA0MyIsImVtYWlsIjoidHJ1bmcubHZiMTIzQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDgtMTRUMTQ6NTk6NDkuOTgyWiIsImlhdCI6MTcyMzY0NzU4OSwiZXhwIjoxNzM3NDcxNTg5fQ.TNxHnVrVs9yygnY0CVorQDrmfzu8e5PdpufR7EaQ8cc'

describe('saveAccessTokenToLocalStorage', () => {
  it('access_token saved to localstorage', () => {
    saveAccessTokenToLocalStorage(access_token)
    expect(localStorage.getItem('accessToken')).toBe(access_token)
  })
})

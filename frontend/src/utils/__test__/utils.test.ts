import { describe, it, expect } from 'vitest'
import { isAxiosError } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// describe dùng để mô tả các ngữ cảnh hoặc đơn vị cần test: Ví dụ Function, Component

describe('isAxiosError', () => {
  // "it" dùng để ghi chú trường hợp cần test
  it('isAxiosError return true', () => {
    //expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosError return true', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(
      isAxiosError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})

//=> yarn test

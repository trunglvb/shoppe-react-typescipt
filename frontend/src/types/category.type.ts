import { ISuccessResponseApi } from './utils.type'
export type ICategory = {
  _id: string
  name: string
}

export type ICategoriesResponse = ISuccessResponseApi<ICategory[]>

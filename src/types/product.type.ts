import { ISuccessResponseApi } from './utils.type'
export type IProduct = {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
    __v: number
  }
  image: string
  createdAt: string
  updatedAt: string
}

export type IProductList = {
  products: IProduct[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export type IProductListConfig = {
  page?: number
  limit?: number
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
export type IProductListResponse = ISuccessResponseApi<IProductList>
export type IProductDetailsResponse = ISuccessResponseApi<IProduct>

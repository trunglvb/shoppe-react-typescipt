import { ISuccessResponseApi } from './utils.type'
import { IProduct } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type IPurchaseListStatus = PurchaseStatus | 0

export interface ICartParams {
  product_id: string
  buy_count: number
}

export interface IPurchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchaseStatus
  user: string
  product: IProduct
  createdAt: string
  updatedAt: string
}

export type IPurchaseResponse = ISuccessResponseApi<IPurchase>
export type IPurchasesList = ISuccessResponseApi<IPurchase[]>
export type IBuyProductResponse = ISuccessResponseApi<IPurchase[]>
export type IProductDeleteResponse = ISuccessResponseApi<{ deleted_count: number }>

export interface IExtendedPurchases extends IPurchase {
  disable: boolean
  checked: boolean
}

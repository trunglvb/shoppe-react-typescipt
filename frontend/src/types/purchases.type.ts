import { ISuccessResponseApi } from './utils.type'
import { IProduct } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type IPurchaseListStatus = PurchaseStatus | 0

export interface IAddToCartParams {
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

export type IAddToCardResponse = ISuccessResponseApi<IPurchase>
export type IPurchasesList = ISuccessResponseApi<IPurchase[]>

export interface ExtendedPurchase extends IPurchase {
  disabled: boolean
  checked: boolean
}

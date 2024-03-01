import {
  IPurchaseResponse,
  ICartParams,
  IPurchaseListStatus,
  IPurchasesList,
  IBuyProductResponse
} from './../types/purchases.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchasesApi = {
  addToCart: (body: ICartParams) => {
    return http.post<IPurchaseResponse>(`${URL}/add-to-cart`, body)
  },
  getPurchasesList: (params: { status: IPurchaseListStatus }) => {
    return http.get<IPurchasesList>(`${URL}`, {
      params: params
    })
  },
  buyProduct: (body: ICartParams[]) => {
    return http.post<IBuyProductResponse>(`${URL}/buy-products`, body)
  },
  updatePurchase: (body: ICartParams) => {
    return http.put<IPurchaseResponse>(`${URL}/update-purchase`, body)
  },
  deletePurchases: (body: string[]) => {
    return http.delete(`${URL}/purchases`, {
      data: body
    })
  }
}

export default purchasesApi

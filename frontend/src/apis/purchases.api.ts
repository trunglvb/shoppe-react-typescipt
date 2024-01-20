import { IAddToCardResponse, IAddToCartParams, IPurchaseListStatus, IPurchasesList } from './../types/purchases.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchasesApi = {
  addToCart: (body: IAddToCartParams) => {
    return http.post<IAddToCardResponse>(`${URL}/add-to-cart`, body)
  },
  getPurchasesList: (params: { status: IPurchaseListStatus }) => {
    return http.get<IPurchasesList>(`${URL}`, {
      params: params
    })
  }
}

export default purchasesApi

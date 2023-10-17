import http from 'src/utils/http'
import { IProductListConfig, IProductListResponse, IProductDetailsResponse } from './../types/product.type'

const URL = {
  getProduct: 'products'
}
const productApi = {
  getProducts: (params: IProductListConfig) => {
    return http.get<IProductListResponse>(URL.getProduct, {
      params
    })
  },
  getProductDetails: (id: string) => {
    return http.get<IProductDetailsResponse>(`${URL.getProduct}/${id}`)
  }
}

export default productApi

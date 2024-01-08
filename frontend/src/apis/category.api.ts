import { ICategoriesResponse } from 'src/types/category.type'
import http from 'src/utils/http'

const URL = {
  categories: 'categories',
  category: 'category'
}

const categoryApis = {
  getCategories: () => {
    return http.get<ICategoriesResponse>(URL.categories)
  }
}

export default categoryApis

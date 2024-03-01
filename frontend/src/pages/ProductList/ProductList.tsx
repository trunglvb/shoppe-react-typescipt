/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import SortProductList from './components/SortProductList'
import { v4 as uuidv4 } from 'uuid'
import Pagination from 'src/components/Paginate'
import { IProductListConfig } from 'src/types/product.type'
import useQueryConfig from 'src/hooks/useQueryConfig'

const ProductList = () => {
  const queryConfig = useQueryConfig()
  const { data: productList } = useQuery({
    //goi lai api khi queryParams thay doi
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as IProductListConfig)
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productList ? (
          <div className='grid grid-cols-12 gap-6'>
            <div className='hidden sm:col-span-3 sm:grid'>
              <AsideFilter queryConfig={queryConfig} />
            </div>
            <div className='col-span-12 sm:col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productList.data.data.pagination.page_size} />
              <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productList?.data.data.products.map((product) => (
                  <div className='col-span-1' key={uuidv4()}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productList.data.data.pagination.page_size} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProductList

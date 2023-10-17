import AsideFilter from './AsideFilter'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product.api'
import SortProductList from './SortProductList'
import { v4 as uuidv4 } from 'uuid'

const ProductList = () => {
  const queryParams = useQueryParams()
  const { data: productList } = useQuery({
    //goi lai api khi queryParams thay doi
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  //thunk in react query
  // const { data: productDetail } = useQuery({
  //   queryKey: ['productDetails', product?.data?.data?.products[0]?._id],
  //   queryFn: () => {
  //     return productApi.getProductDetails(product?.data?.data?.products[0]?._id ?? '')
  //   },
  //   enabled: !!product?.data?.data?.products[0]?._id
  // })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {productList?.data.data.products.map((product) => (
                <div className='col-span-1' key={uuidv4()}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom'
import LogoHeader from '../LogoHeader'
import Popover from '../Popover'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useQuery } from '@tanstack/react-query'
import path from 'src/constants/path'
import purchasesApi from 'src/apis/purchases.api'
import { purchasesStatus } from 'src/constants/purchases'
import { v4 as uuidv4 } from 'uuid'
import { IPurchase } from 'src/types/purchases.type'
import noproduct from 'src/assets/images/no-product.png'
import { formatCurrency } from 'src/utils/utils'
import useSearchProducts from 'src/hooks/useSearchProducts'
import NavHeader from '../NavHeader/NavHeader'

const max_product_in_cart = 5

const Header = () => {
  const { register, handleSearch } = useSearchProducts()
  const { isAuthenticated } = useContext(AppContext)

  //khi chuyen trang thi header chi rerender chu khong bi unmount
  // => query nay khong bi inactive => khong bi goi lai
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['product', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchasesList({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })
  const purchasesInCart = purchasesInCartData?.data?.data
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] pb-5 pt-2 text-white'>
      <div className='container'>
        <NavHeader />
        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <div className='col-span-2'>
            <LogoHeader fill='fill-white' />
          </div>
          <form className='col-span-9' onSubmit={handleSearch}>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                placeholder='Đăng kí và nhận vocher bạn mới đến 70k'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-orange px-6 py-2 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <Popover
            className='justify-center'
            placement='bottom-end'
            renderPopover={
              <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                <div className='p-2'>
                  <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                  <div className='mt-5'>
                    {purchasesInCart && purchasesInCart?.length > 0 ? (
                      purchasesInCart?.slice(0, max_product_in_cart).map((item: IPurchase) => (
                        <div className='mt-1 flex py-2 hover:bg-gray-100' key={uuidv4()}>
                          <div className='flex-shrink-0'>
                            <img className='h-11 w-11 object-cover' src={item.product.image} alt={item.product.name} />
                          </div>
                          <div className='ml-2 flex-grow overflow-hidden'>
                            <div className='truncate'>{item.product.name}</div>
                          </div>
                          <div className='ml-2 flex-shrink-0 text-orange'>{formatCurrency(item.price)}</div>
                        </div>
                      ))
                    ) : (
                      <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                        <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                        <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                      </div>
                    )}
                  </div>
                  <div className='mt-6 flex items-center justify-between'>
                    <div className='text-xs capitalize text-gray-500'>{` ${
                      purchasesInCart && purchasesInCart.length > max_product_in_cart
                        ? purchasesInCart.length - max_product_in_cart
                        : ''
                    } Thêm vào giỏ hàng`}</div>
                    <Link
                      to={path.cart}
                      className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:opacity-80'
                    >
                      Xem giỏ hàng
                    </Link>
                  </div>
                </div>
              </div>
            }
          >
            <div className='col-span-1 flex items-center justify-center text-xl'>
              <div className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {isAuthenticated && purchasesInCart && purchasesInCart.length > 0 && (
                  <span className='absolute left-[17px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange '>
                    {purchasesInCart?.length}
                  </span>
                )}
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default Header

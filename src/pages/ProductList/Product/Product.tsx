import { Link } from 'react-router-dom'
import Popover from 'src/components/Popover'
import { IProduct } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import Rating from 'src/components/Rating/Rating'

interface IProductProps {
  product: IProduct
}
const Product = ({ product }: IProductProps) => {
  return (
    <>
      <Link to='/'>
        <div className='mt-5 overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-sm'>
          <div className='relative w-full pt-[100%]'>
            {/* pt 100% để cho ảnh luôn là hình vuông */}
            <img
              src={product.image}
              alt={product.name}
              className='absolute left-0 top-0 h-full w-full object-contain'
            />
          </div>
          <div className='w-full overflow-hidden p-2'>
            <Popover
              placement='bottom'
              className='flex text-[13px]'
              arrowColorSlate
              renderPopover={
                <div className='relative flex w-[200px] rounded-md bg-slate-900 p-2'>
                  <span className='text-xs text-white '>{product.name}</span>
                </div>
              }
            >
              <div className='line-clamp-2 min-h-[2rem] text-xs'>{product.name}</div>
            </Popover>
            <div className='mt-3 flex items-center'>
              <div className='max-w-[50%] truncate text-gray-500 line-through'>
                <span className='text-xs'>₫</span>
                <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
              </div>
              <div className='ml-1 text-orange'>
                <span className='text-xs'>₫</span>
                <span className='text-sm'>{formatCurrency(product.price)}</span>
              </div>
            </div>
            <div className='mt-3 flex items-center justify-start'>
              <Rating rating={product.rating} />
              <div className='ml-2 text-xs'>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1'>Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Product

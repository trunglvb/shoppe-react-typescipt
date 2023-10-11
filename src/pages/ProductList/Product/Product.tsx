import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <>
      <Link to='/'>
        <div className='mt-5 overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-sm'>
          <div className='relative w-full pt-[100%]'>
            {/* pt 100% để cho ảnh luôn là hình vuông */}
            <img
              src='https://down-vn.img.susercontent.com/file/57cd56bc6b28ec9601d0b3b25c2662bf_tn'
              alt=''
              className='absolute left-0 top-0 h-full w-full object-contain'
            />
          </div>
          <div className='overflow-hidden p-2'>
            <div className='line-clamp-2 min-h-[2rem] text-xs'>
              Thắt lưng nam mặt cá sấu, dây lưng nam khóa tự động mặt kim loại nguyên khối trẻ trung lịch lãm TLCS001
            </div>
            <div className='mt-3 flex items-center'>
              <div className='max-w-[50%] truncate text-gray-500 line-through'>
                <span className='text-xs'>₫</span>
                <span>5.000</span>
              </div>
              <div className='ml-1 text-orange'>
                <span className='text-xs'>₫</span>
                <span>2000</span>
              </div>
            </div>
            <div className='mt-3 flex items-center justify-start'>
              <div className='flex items-center'>
                <div className='relative'>
                  <div
                    className='absolute left-0 top-0 h-full overflow-hidden'
                    style={{
                      width: '50%'
                    }}
                  >
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x='0'
                      y='0'
                      className='h-3 w-3 fill-yellow-300 text-yellow-300'
                    >
                      <polygon
                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeMiterlimit='10'
                      ></polygon>
                    </svg>
                  </div>
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x='0'
                    y='0'
                    className='h-3 w-3 fill-current text-gray-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit='10'
                    ></polygon>
                  </svg>
                </div>
              </div>
              <div className='ml-2 text-xs'>
                <span>5.66k</span>
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

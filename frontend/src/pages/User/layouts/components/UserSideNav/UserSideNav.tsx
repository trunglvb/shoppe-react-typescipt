import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

const UserSideNav = () => {
  const { profile } = useContext(AppContext)
  return (
    <>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-10 w-10 flex-shrink-0 overflow-hidden rounded-full'>
          <img
            className='h-full w-full rounded-full object-cover'
            src={profile?.avatar || 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}
            alt='avatar'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>lvbtrung</div>
          <Link to={path.profile} className='flex items-center gap-1 capitalize text-gray-500'>
            <svg
              width={10}
              height={10}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='mt-4 flex items-center capitalize text-orange transition-colors '>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.profile} className='mt-4 flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='text-[#405da7]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
              />
            </svg>
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.profile} className='mt-4 flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='h-full w-full' />
          </div>
          Đơn mua
        </Link>
      </div>
    </>
  )
}

export default UserSideNav

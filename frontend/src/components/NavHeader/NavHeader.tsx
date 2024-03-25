import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logoutAccount } from 'src/apis/auth.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchases'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import { getAvatarUrl } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

export default function NavHeader() {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language as keyof typeof locales
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleChangeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='flex items-center justify-end'>
      <Popover
        placement='bottom-end'
        className='flex text-[13px]'
        renderPopover={
          <div className='relative flex flex-col items-start justify-start rounded-sm border border-gray-200 bg-white py-2 pl-2 pr-28 text-[13px] shadow-md'>
            <button className='px-3 py-2 hover:text-orange' onClick={() => handleChangeLanguage('vi')}>
              Tiếng Việt
            </button>
            <button className='mt-2 px-3 py-2 hover:text-orange' onClick={() => handleChangeLanguage('en')}>
              English
            </button>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>{locales[currentLanguage]}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated ? (
        <Popover
          placement='bottom-end'
          className='text-xs'
          renderPopover={
            <div className='relative mr-10 flex w-full flex-col rounded-sm border border-gray-200 bg-white text-[13px] shadow-md'>
              <Link
                to={path.profile}
                className='block w-full px-4 py-3 text-left hover:bg-slate-50 hover:text-cyan-500'
              >
                Tài khoản của tôi
              </Link>
              <Link to='/' className='block w-full px-4 py-3 text-left hover:bg-slate-50 hover:text-cyan-500'>
                Đơn mua
              </Link>
              <button
                className=' w-full px-4 py-3 text-left hover:bg-slate-50 hover:text-cyan-500'
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'>
            <div className='mr-2 h-4 w-4 flex-shrink-0'>
              <img
                className='h-full w-full rounded-full object-cover'
                src={getAvatarUrl(profile?.avatar)}
                alt='avatar'
              />
            </div>
            <div>{profile?.email}</div>
          </div>
        </Popover>
      ) : null}
      {!isAuthenticated ? (
        <div className='flex items-center text-[13px]'>
          <Link to={path.register} className='mx-3 hover:text-white/70'>
            Đăng Kí
          </Link>
          <div className='h-3 border-r-[1px] border-r-white/40'></div>
          <Link to={path.login} className='mx-3 hover:text-white/70'>
            Đăng Nhập
          </Link>
        </div>
      ) : null}
    </div>
  )
}

import UserSideNav from '../components/UserSideNav'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='rounded-sm bg-white px-3 pb-20 shadow md:col-span-9 md:px-7 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout

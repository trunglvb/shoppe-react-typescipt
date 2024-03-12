import UserSideNav from '../components/UserSideNav'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  )
}

export default UserLayout

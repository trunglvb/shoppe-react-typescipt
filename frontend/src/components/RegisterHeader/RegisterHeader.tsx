import { Link, useMatch } from 'react-router-dom'
import LogoHeader from '../LogoHeader'
import path from 'src/constants/path'

const RegisterHeader = () => {
  const registerMatch = useMatch(path.register)
  const isRegisterRoute = Boolean(registerMatch)

  return (
    <div className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={path.home}>
            <LogoHeader fill='fill-orange' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegisterRoute ? 'Đăng ký' : 'Đăng nhập'}</div>
        </nav>
      </div>
    </div>
  )
}

export default RegisterHeader

import { Link } from 'react-router-dom'
import LogoHeader from '../LogoHeader'

const RegisterHeader = () => {
  return (
    <div className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>
            <LogoHeader fill='fill-orange' />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>Đăng ký</div>
        </nav>
      </div>
    </div>
  )
}

export default RegisterHeader

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { getRules } from 'src/utils/rules'

interface IFormData {
  email: string
  password: string
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const rules = getRules()
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                type='email'
                className='mt-8'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                rules={rules.email}
              />
              <Input
                type='password'
                className='mt-1'
                placeholder='Password'
                name='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
                rules={rules.password}
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='px-2- w-full bg-red-500 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

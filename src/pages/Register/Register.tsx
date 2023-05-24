import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from 'src/utils/rules'

interface IFormData {
  email: string
  password: string
  confirm_password: string
}
const Register = () => {
  const {
    register,
    handleSubmit,
    // watch => // de theo doi hanh dong onChange
    getValues,
    formState: { errors }
  } = useForm<IFormData>()
  //useForm({ mode: 'all' })
  const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {
      //ham trong nay chi chay khi form dung dinh dang
    },
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )

  return (
    <div className='bg-orange'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng kí</div>
              <div className='mt-8 '>
                <input
                  type='email'
                  className='w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.email?.message}</div>
              </div>
              <div className='mt-1'>
                <input
                  type='password'
                  className='w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.password?.message}</div>
              </div>
              <div className='mt-1'>
                <input
                  type='password'
                  className='w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Confirm Password'
                  autoComplete='on'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='px-2- w-full bg-red-500 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng kí
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register

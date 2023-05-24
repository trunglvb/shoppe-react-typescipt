import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from 'src/utils/rules'
import Input from 'src/components/Input'

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
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng kí</div>
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
              <Input
                type='password'
                className='mt-1'
                placeholder='Confirm Password'
                name='confirm_password'
                register={register}
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                rules={rules.confirm_password}
              />
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

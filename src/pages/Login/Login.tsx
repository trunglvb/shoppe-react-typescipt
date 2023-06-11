import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import { loginAccount } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { IResponseApi } from 'src/types/utils.type'

type IFormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: IFormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        //
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError<IResponseApi<IFormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof IFormData, {
                message: formError[key as keyof IFormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
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
              />
              <Input
                type='password'
                className='mt-1'
                placeholder='Password'
                name='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
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

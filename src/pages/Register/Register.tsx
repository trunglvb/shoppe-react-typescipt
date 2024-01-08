import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { schema, ISchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Input from 'src/components/Input'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { IErrorResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button/Button'
import path from 'src/constants/path'

type IFormData = Omit<ISchema, 'price_max' | 'price_min'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    // watch => // de theo doi hanh dong onChange
    // getValues,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(registerSchema)
  })
  //useForm({ mode: 'all' })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<IFormData, 'confirm_password' | 'price_min' | 'price_max'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // const value = getValues()
    // console.log(value)
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (res) => {
        setIsAuthenticated(true)
        setProfile(res?.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<IErrorResponseApi<Omit<IFormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<IFormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<IFormData, 'confirm_password'>],
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
              <div className='text-2xl'>Đăng kí</div>
              <Input
                type='email'
                className='mt-8'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                // rules={rules.email}
              />
              <Input
                type='password'
                className='mt-1'
                placeholder='Password'
                name='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
                // rules={rules.password}
              />
              <Input
                type='password'
                className='mt-1'
                placeholder='Confirm Password'
                name='confirm_password'
                register={register}
                autoComplete='on'
                errorMessage={errors.confirm_password?.message}
                // rules={rules.confirm_password}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='px-2- w-full bg-red-500 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng kí
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={path.login}>
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

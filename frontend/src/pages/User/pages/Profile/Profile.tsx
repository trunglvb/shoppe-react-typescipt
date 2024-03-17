import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { IUserSchema, userSchema } from 'src/utils/rules'
import DateSelect from '../../layouts/components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { saveProfileToLocalStorage } from 'src/utils/auth'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { IErrorResponseApi } from 'src/types/utils.type'

// can convert type formError cua avatar sang string vi error se co dang giong nhu data api tra ve
type IFormData = Pick<IUserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>
type IFormDataError = Omit<IFormData, 'date_of_birth'> & {
  date_of_birth: string
}
const maxSizeUpload = 1048576

const registerSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar'])
const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<IFormData>({
    defaultValues: {
      name: ' ',
      address: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(registerSchema)
  })

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const updloadImageMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      let imageURL = avatar
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        const uploadImageResponse = await updloadImageMutation.mutateAsync(formData)
        imageURL = uploadImageResponse?.data.data
        setValue('avatar', imageURL)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data?.date_of_birth?.toISOString(),
        avatar: imageURL
      })
      setProfile(res.data.data)
      saveProfileToLocalStorage(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<IErrorResponseApi<IFormDataError>>(error)) {
        const formError = error.response?.data.data
        console.log(formError)
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof IFormDataError, {
              message: formError[key as keyof IFormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUpload = event.target.files?.[0]
    if (fileUpload && (fileUpload.size >= maxSizeUpload || !fileUpload.type.includes('image'))) {
      toast.error('Lỗi file không đúng rule quy định')
    }
    setFile(fileUpload)
  }

  const handleUploadImage = () => {
    fileInputRef?.current?.click()
  }

  const previewImage = file ? URL.createObjectURL(file) : ''
  console.log('previewImage', previewImage)
  const avatar = watch('avatar')

  return (
    <>
      <div className='border-b border-b-gray-200 py-3'>
        <div className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-6 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='flex-grow md:mt-0 md:pr-12'>
          <div className='mt-3 flex flex-wrap md:mt-0'>
            <div className='w-[20%] truncate text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className=' text-gray-400'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-3 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Tên'
                register={register}
                name='name'
                errorMessage={errors?.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='Số điện thoại'
                      classNameInput='w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm text-sm'
                      classNameError='mt-1 min-h-[1.25rem] text-sm text-red-600'
                      errorMessage={errors?.phone?.message}
                      {...field}
                      onChange={(event) => {
                        field.onChange(event)
                      }}
                    />
                  )
                }}
              ></Controller>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='w-[80%] pl-5'>
              <Input
                classNameInput='w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Địa chỉ'
                register={register}
                name='address'
                errorMessage={errors?.address?.message}
              />
            </div>
          </div>

          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => {
              return (
                <DateSelect
                  errorMessage={errors?.date_of_birth?.message}
                  onChange={(value) => {
                    field.onChange(value)
                  }}
                  value={field.value}
                />
              )
            }}
          />

          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'></div>
            <div className='w-[80%] pl-5'>
              <Button className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='mt-2 flex flex-shrink-0 justify-center md:mt-0 md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                className='h-full w-full rounded-full object-cover'
                src={previewImage || getAvatarUrl(avatar)}
                alt='avatar'
              />
            </div>
            <input
              type='file'
              className='hidden'
              accept='.jpg, .jpeg, .png'
              ref={fileInputRef}
              onChange={onFileChange}
              onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ;(event.target as any).value = null
              }}
            />
            <button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm hover:bg-gray-200'
              type='button'
              onClick={handleUploadImage}
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB.</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Profile

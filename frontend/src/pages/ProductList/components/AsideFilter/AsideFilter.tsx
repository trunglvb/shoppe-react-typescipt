import { useQuery } from '@tanstack/react-query'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import categoryApis from 'src/apis/category.api'
import Button from 'src/components/Button/Button'
import path from 'src/constants/path'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema, ISchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { INoUndefineField } from 'src/types/utils.type'
import RatingStars from '../RatingStarts/RatingStars'
import { IQueryConfig } from 'src/types/product.type'
import omit from 'lodash/omit'
import { v4 as uuidv4 } from 'uuid'

interface ICategoriesProps {
  queryConfig: IQueryConfig
}
type IFormData = INoUndefineField<Pick<ISchema, 'price_min' | 'price_max'>>

const priceSchema = schema.pick(['price_min', 'price_max'])
const AsideFilter = (props: ICategoriesProps) => {
  const { queryConfig } = props
  const navigate = useNavigate()

  //control form
  const {
    control,
    handleSubmit,
    trigger, // validate lai
    formState: { errors }
  } = useForm<IFormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApis.getCategories()
    }
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      } as IQueryConfig).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryConfig, ['rating_filter', 'price_max', 'price_min', 'category']) as IQueryConfig
      ).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='mr-2 h-4 w-3'>
          <g fillRule='evenodd' stroke='none' strokeWidth='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categoriesData
          ? categoriesData?.data.data.map((categoryItem) => {
              const isActive = queryConfig?.category === categoryItem._id
              return (
                <li className='py-2 pl-2' key={uuidv4()}>
                  <Link
                    to={{
                      pathname: path.home,
                      search: createSearchParams({
                        ...queryConfig,
                        category: categoryItem._id
                      } as IQueryConfig).toString()
                    }}
                    className={classNames('relative pl-2 ', {
                      'font-semibold text-orange': isActive
                    })}
                  >
                    {isActive ? (
                      <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                        <polygon points='4 3.5 0 0 0 7'></polygon>
                      </svg>
                    ) : null}
                    {categoryItem?.name}
                  </Link>
                </li>
              )
            })
          : null}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='mr-2 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit='10'
            ></polyline>
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' noValidate onSubmit={onSubmit}>
          <div className='flex items-start gap-5'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ TỪ'
                    classNameError='hidden'
                    classNameInput='w-full border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    // value={field.value}
                    // ref={field.ref}
                  />
                )
              }}
            ></Controller>

            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='₫ ĐẾN'
                    classNameInput='w-full border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    // value={field.value}
                    // ref={field.ref}
                  />
                )
              }}
            ></Controller>
          </div>
          <div className='text-ce mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>
            {errors?.price_min?.message}
          </div>
          <Button
            type='submit'
            className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
          >
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
        onClick={handleRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter

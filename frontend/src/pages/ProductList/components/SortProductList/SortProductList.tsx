import { sortBy, sortBy as sortConstant, order as orderConstant } from 'src/constants/product'

import classNames from 'classnames'
import { IProductListConfig, IQueryConfig } from 'src/types/product.type'
import { useNavigate, createSearchParams, Link } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'

interface ISortProductListProps {
  queryConfig: IQueryConfig
  pageSize: number
}
const SortProductList = (props: ISortProductListProps) => {
  const navigate = useNavigate()
  const { queryConfig, pageSize } = props
  const { sort_by = sortConstant.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)

  const isActiveSortBy = (sortByValue: Exclude<IProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<IProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          } as IQueryConfig,
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<IProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      } as IQueryConfig).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            onClick={() => handleSort(sortConstant.view)}
            className={classNames('h-8 rounded-sm  px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortConstant.view),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortConstant.view)
            })}
          >
            Phổ biến
          </button>
          <button
            onClick={() => handleSort(sortConstant.createdAt)}
            className={classNames('h-8 rounded-sm  px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortConstant.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortConstant.createdAt)
            })}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSort(sortConstant.sold)}
            className={classNames(' h-8 rounded-sm px-4  text-center text-sm capitalize ', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortConstant.sold),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortConstant.sold)
            })}
          >
            Bán chạy
          </button>
          <select
            className={classNames("outline-none' h-8 rounded px-4 text-left text-sm capitalize", {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(sortBy.price)
            })}
            id='ddd'
            value={order ?? ''}
            onChange={(event) => {
              handlePriceOrder(event?.target.value as Exclude<IProductListConfig['order'], undefined>)
            }}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>{`/${pageSize}`}</span>
          </div>
          <div className='ml-2 flex items-center'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList

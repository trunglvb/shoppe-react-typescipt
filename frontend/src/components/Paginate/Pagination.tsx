import classNames from 'classnames'
import { IQueryConfig } from 'src/types/product.type'
import { v4 as uuidv4 } from 'uuid'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'

interface IPaginationProps {
  queryConfig: IQueryConfig
  pageSize: number
}
const RANGE = 2
const Pagination = (props: IPaginationProps) => {
  const { pageSize, queryConfig } = props
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    //sau currentPage
    const onRenderDotAfter = () => {
      //se chi return ... 1 lan khi gap pageNumber thoa man
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={uuidv4()} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }

    //truoc currentPage
    const onRenderDotBefore = () => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={uuidv4()} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
          return onRenderDotAfter()
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return onRenderDotBefore()
          } else if (pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
            return onRenderDotAfter()
          }
        } else if (pageNumber < page - RANGE && pageNumber > RANGE && page >= pageSize - RANGE * 2) {
          return onRenderDotBefore()
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={uuidv4()}
            className={classNames('mx-2 cursor-pointer rounded border bg-white/60 px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='mt-6 flex flex-wrap items-center justify-center'>
      {page === 1 ? (
        <button className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm'>Prev</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <button className='mx-2 cursor-not-allowed rounded border bg-white px-3 py-2 shadow-sm'>Next</button>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination

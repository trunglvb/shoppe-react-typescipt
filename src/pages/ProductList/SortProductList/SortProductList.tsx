const SortProductList = () => {
  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-8 rounded-sm bg-orange px-4 text-center text-sm capitalize text-white'>Phổ biến</button>
          <button className='h-8 rounded-sm bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Mới nhất
          </button>
          <button className='h-8 rounded-sm bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            Bán chạy
          </button>
          <select className='h-8 rounded px-4 text-left text-sm capitalize outline-none'>
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value='price:asc' className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value='price:desc' className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2 flex items-center'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList

import Input from 'src/components/Input'

const Profile = () => {
  return (
    <>
      <div className='border-b border-b-gray-200 py-3'>
        <div className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</div>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className='mt-6 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='flex-grow md:mt-0 md:pr-12'>
          <div className='mt-3 flex flex-wrap md:mt-0'>
            <div className='w-[20%] truncate text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className=' text-gray-400'>trunglvb.hust@gmail.com</div>
            </div>
          </div>
          <div className='mt-3 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5'>
              <Input classNameInput='w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5'>
              <Input classNameInput='w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='w-[80%] pl-5'>
              <Input classNameInput='w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
            <div className='w-[80%] pl-5'>
              <div className='flex justify-between gap-3'>
                <select className='h-10 w-full rounded-sm border border-black/10'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-full rounded-sm border border-black/10'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-full rounded-sm border border-black/10'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='mt-2 flex flex-shrink-0 justify-center md:mt-0 md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                className='h-full w-full rounded-full object-cover'
                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
                alt='avatar'
              />
            </div>
            <input type='file' className='hidden' accept='.jpg, .jpeg, .png' />
            <button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm hover:bg-gray-200'
              type='button'
            >
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB.</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile

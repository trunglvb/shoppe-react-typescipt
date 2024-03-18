import React, { useRef } from 'react'
import { toast } from 'react-toastify'

const maxSizeUpload = 1048576

interface IInputFileProps {
  onChange?: (file?: File) => void
}
const InputFile = (props: IInputFileProps) => {
  const { onChange } = props
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUpload = event.target.files?.[0]
    if (fileUpload && (fileUpload.size >= maxSizeUpload || !fileUpload.type.includes('image'))) {
      toast.error('Lỗi file không đúng rule quy định')
    }
    onChange && onChange(fileUpload)
  }

  const handleUploadImage = () => {
    fileInputRef?.current?.click()
  }
  return (
    <>
      <input
        type='file'
        className='hidden'
        accept='.jpg, .jpeg, .png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          //fix loi chon cung 1 anh
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
    </>
  )
}

export default InputFile

/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import Rating from 'src/components/Rating/Rating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'
import { v4 as uuidv4 } from 'uuid'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState, useRef } from 'react'
import { IProduct } from 'src/types/product.type'
import QuantityController from 'src/components/QuantityController/QuantityController'
import purchasesApi from 'src/apis/purchases.api'
import { ICartParams } from 'src/types/purchases.type'
import { purchasesStatus } from 'src/constants/purchases'
import { toast } from 'react-toastify'
import path from 'src/constants/path'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: productDetail } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => productApi.getProductDetails(id as string)
  })
  const product = productDetail?.data?.data
  const imageRef = useRef<HTMLImageElement>(null)
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState<string>('')
  const [buyCount, setBuyCount] = useState(1)

  const currentImages = useMemo(() => product?.images?.slice(...currentIndexImages), [currentIndexImages, product])

  useEffect(() => {
    if (product && product?.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const handleChooseCurrentImage = (image: string) => {
    setActiveImage(image)
  }

  const handleNextSlide = () => {
    if (currentIndexImages[1] < (product as IProduct).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const handlePrevSlide = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCartMutation = useMutation({
    mutationFn: (body: ICartParams) => purchasesApi.addToCart(body),
    onSuccess: () => {
      toast.success('Thêm sản phẩm vào giỏ hàng thành công', { autoClose: 2000 })
      queryClient.invalidateQueries({
        queryKey: ['purchases', { status: purchasesStatus.inCart }]
      })
    }
  })

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      product_id: product?._id as string,
      buy_count: buyCount
    })
  }

  const handleBoyNow = async () => {
    const res = await addToCartMutation.mutateAsync({
      product_id: product?._id as string,
      buy_count: buyCount
    })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchasesId: purchase?._id
      }
    })
  }
  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow-sm'>
          <div className='grid grid-cols-12'>
            <div className='col-span-4'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-[50%] z-10 h-9 w-5 translate-y-[-50%] bg-black/20  text-white'
                  onClick={handlePrevSlide}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages?.map((image) => {
                  const isActive = image === activeImage
                  return (
                    <div
                      className='relative w-full pt-[100%]'
                      key={uuidv4()}
                      onMouseEnter={() => {
                        handleChooseCurrentImage(image)
                      }}
                    >
                      <img
                        src={image}
                        alt=''
                        className='absolute left-0 top-0 h-full w-full cursor-pointer object-cover'
                      />
                      {isActive ? <div className='absolute inset-0 border-2 border-orange'></div> : null}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-[50%] z-10 h-9 w-5 translate-y-[-50%] bg-black/20  text-white'
                  onClick={handleNextSlide}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-8 px-4'>
              <div className='text-xl font-medium uppercase'>{product.name}</div>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <Rating rating={product.rating} />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  onClick={handleAddToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                  onClick={handleBoyNow}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='bg-white p-4 shadow'>
          <div className='  container'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

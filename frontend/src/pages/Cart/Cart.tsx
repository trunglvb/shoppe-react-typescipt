/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from 'flowbite-react'
import purchasesApi from 'src/apis/purchases.api'
import { purchasesStatus } from 'src/constants/purchases'
import { formatCurrency } from 'src/utils/utils'
import { Link, useLocation } from 'react-router-dom'
import QuantityController from 'src/components/QuantityController/QuantityController'
import { ICartParams, IPurchase } from 'src/types/purchases.type'
import { produce } from 'immer'
import { toast } from 'react-toastify'
import { keyBy } from 'lodash'
import { AppContext } from 'src/contexts/app.context'
import noproduct from 'src/assets/images/no-product.png'
import path from 'src/constants/path'

const Cart = () => {
  const location = useLocation()
  const choosenPurchasesLocationId = (location?.state as { purchasesId: string | null })?.purchasesId
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchasesList({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data?.data
  const isChecKAll = extendedPurchases?.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases?.filter((purchases) => purchases.checked)
  const totalCheckedPurchasePrice = extendedPurchases?.reduce(
    (acc, current) => acc + current.product.price * current.buy_count,
    0
  )
  const totalCheckedPurchaseSavingPrice = extendedPurchases?.reduce(
    (acc, current) => acc + (current.product.price_before_discount - current.product.price) * current.buy_count,
    0
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosenPurchasesLocation = choosenPurchasesLocationId === purchase?._id
          return {
            ...purchase,
            disable: false,
            checked: isChoosenPurchasesLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) ?? []
      )
    })
  }, [purchasesInCart])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const updatePurchaseMutation = useMutation({
    mutationFn: (body: ICartParams) => purchasesApi.updatePurchase(body),
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: (body: ICartParams[]) => purchasesApi.buyProduct(body),
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message)
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: (body: string[]) => purchasesApi.deletePurchases(body),
    onSuccess: () => {
      refetch()
    }
  })

  const handleCheck = (purchasesIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchasesIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isChecKAll
      }))
    )
  }

  const handleQuantity = (purchasesIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchases[purchasesIndex]
      const body = {
        product_id: purchase.product._id,
        buy_count: value
      }
      setExtendedPurchases(
        produce((draft) => {
          draft[purchasesIndex].disable = true
        })
      )
      updatePurchaseMutation.mutate(body)
    }
  }

  const handleTypeQuantity = (purchasesIndex: number, value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchasesIndex].buy_count = value
      })
    )
  }

  const handleDeletePurchases = (purchasesIndex: number) => () => {
    const purchasesId = extendedPurchases[purchasesIndex]._id
    deletePurchasesMutation.mutate([purchasesId])
  }

  const handleDeleteMultiplePurchases = () => {
    const purchasesIds = checkedPurchases?.map((purchases) => purchases._id)
    console.log(purchasesIds)
    deletePurchasesMutation.mutate(purchasesIds)
  }

  const handleBuyProducts = () => {
    const body = checkedPurchases?.map((purchases) => ({
      product_id: purchases._id,
      buy_count: purchases.buy_count
    }))
    buyProductsMutation.mutate(body)
  }

  return (
    <div className='bg-neutral-100 py-16'>
      {extendedPurchases?.length > 0 ? (
        <div className='container overflow-auto pl-0 pr-0'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 text-orange accent-orange outline-none focus:ring-0'
                      onChange={handleCheckAll}
                      checked={isChecKAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchases?.map((item, index) => (
                <div
                  key={item._id}
                  className='mt-4 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 text-orange accent-orange outline-none focus:ring-0'
                          onChange={handleCheck(index)}
                          checked={item.checked}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link to={`/${item.product._id}`} className='h-20 w-20 flex-shrink-0'>
                            <img src={item.product.image} alt={item.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pb-2 pt-1'>
                            <Link to={`/${item.product._id}`} className='line-clamp-2 text-left'>
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-400 line-through'>
                            {formatCurrency(item.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>{formatCurrency(item.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={item.product.quantity}
                          value={item.buy_count}
                          classNameWrapper='fllex items-center'
                          onIncrease={(value) => handleQuantity(index, value, value <= item.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          onType={(value) => handleTypeQuantity(index, value)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value >= 1 &&
                                value <= item.product.quantity &&
                                value !== (purchasesInCart as IPurchase[])[index].buy_count
                            )
                          }
                          disabled={item.disable}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>{formatCurrency(item.product.price * item.buy_count)}</span>
                      </div>
                      <div className='col-span-1'>
                        <button
                          onClick={handleDeletePurchases(index)}
                          className='bg-none text-black transition-colors hover:text-orange '
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* sticky khi scroll */}
          <div className='sticky bottom-0 z-10 ml-auto mr-auto flex min-w-[1000px] max-w-[80rem] flex-col rounded-sm border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 text-orange accent-orange outline-none focus:ring-0'
                  onChange={handleCheckAll}
                  checked={isChecKAll}
                />
                <div className='mx-3 border-none bg-none'>{`Chọn tất cả (${purchasesInCart?.length})`}</div>
                <button className='mx-3 border-none bg-none' onClick={handleDeleteMultiplePurchases}>
                  Xoá
                </button>
              </div>
            </div>

            <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
              <div>
                <div className='flex items-center sm:justify-end'>
                  <div>Tổng thanh toán ({checkedPurchases?.length} sản phẩm):</div>
                  <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                </div>
                <div className='flex items-center text-sm sm:justify-end'>
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                </div>
              </div>
              <Button
                className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                onClick={handleBuyProducts}
                disabled={buyProductsMutation.isLoading}
              >
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
          <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
          <div className='mt-5 text-center'>
            <Link
              to={path.home}
              className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
            >
              Mua ngay
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

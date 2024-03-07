import React from 'react'
import CartHeader from 'src/components/CartHeader/CartHeader'
import Footer from 'src/components/Footer'

interface ICartLayoutProps {
  children?: React.ReactNode
}
const CartLayout = ({ children }: ICartLayoutProps) => {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  )
}

export default CartLayout

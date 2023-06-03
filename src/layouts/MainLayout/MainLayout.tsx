import React from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface IMainLayoutProps {
  children?: React.ReactNode
}
const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout

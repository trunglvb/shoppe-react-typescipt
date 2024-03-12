import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from 'src/layouts/RegisterLayout'
import MainLayout from 'src/layouts/MainLayout'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Register from 'src/pages/Register'
import Profile from 'src/pages/User/pages/Profile'
import ProductDetail from 'src/pages/ProductDetail'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import Cart from 'src/pages/Cart'
import CartLayout from 'src/layouts/CartLayout/CartLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import ChangePassword from 'src/pages/User/pages/ChangePassword'
import HistoryPurchase from 'src/pages/User/pages/HistoryPurchase'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}
const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      index: true,
      path: path.home,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}

export default useRouteElement

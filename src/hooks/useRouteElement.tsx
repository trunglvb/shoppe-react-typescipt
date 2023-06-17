import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from 'src/layouts/RegisterLayout'
import MainLayout from 'src/layouts/MainLayout'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Register from 'src/pages/Register'
import Profile from 'src/components/Profile'

const isAuthenticated = false
const ProtectedRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
const RejectedRoute = () => {
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      index: true,
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
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

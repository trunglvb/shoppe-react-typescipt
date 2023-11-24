import useRouteElement from './hooks/useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
function App() {
  const routeElement = useRouteElement()
  const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])

    return null
  }
  return (
    <>
      {routeElement}
      <ScrollToTop />
      <ToastContainer />
    </>
  )
}

export default App

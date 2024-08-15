import useRouteElement from './hooks/useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
function App() {
  const routeElement = useRouteElement()
  const { resetBrowser } = useContext(AppContext)

  const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])
    return null
  }

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', resetBrowser)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', resetBrowser)
    }
  }, [resetBrowser])

  return (
    <>
      {routeElement}
      <ScrollToTop />
      <ToastContainer />
    </>
  )
}

export default App

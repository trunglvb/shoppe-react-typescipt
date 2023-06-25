import React, { createContext, useMemo, useState } from 'react'
import { getAccessTokenFromLocalStorage } from 'src/utils/auth'

interface IAppContextsProps {
  children: React.ReactNode
}
interface IAppContexts {
  isAuthenticated: boolean
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>
}

const initialContext: IAppContexts = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<IAppContexts>(initialContext)

export const AppProvider = (props: IAppContextsProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

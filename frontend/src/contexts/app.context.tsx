import React, { createContext, useState, useMemo } from 'react'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from 'src/utils/auth'
import { IUser } from 'src/types/user.type'
import { IExtendedPurchases } from 'src/types/purchases.type'

interface IAppContextsProps {
  children: React.ReactNode
}
interface IAppContexts {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: IUser | null
  setProfile: React.Dispatch<React.SetStateAction<IUser | null>>
  extendedPurchases: IExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<IExtendedPurchases[]>>
  resetBrowser: () => void
}

const initialContext: IAppContexts = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLocalStorage(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  resetBrowser: () => null
}

export const AppContext = createContext<IAppContexts>(initialContext)

export const AppProvider = (props: IAppContextsProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  const [profile, setProfile] = useState<IUser | null>(initialContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<IExtendedPurchases[]>([])

  const resetBrowser = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      profile,
      setIsAuthenticated,
      setProfile,
      extendedPurchases,
      setExtendedPurchases,
      resetBrowser
    }),
    [isAuthenticated, setIsAuthenticated, profile, setProfile, setExtendedPurchases, extendedPurchases]
  )
  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}

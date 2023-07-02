import React, { createContext, useState, useMemo } from 'react'
import { getAccessTokenFromLocalStorage, getProfileFromLocalStorage } from 'src/utils/auth'
import { IUser } from 'src/types/user.type'

interface IAppContextsProps {
  children: React.ReactNode
}

interface IAppContexts {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: IUser | null
  setProfile: React.Dispatch<React.SetStateAction<IUser | null>>
}

const initialContext: IAppContexts = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLocalStorage(),
  setProfile: () => null
}

export const AppContext = createContext<IAppContexts>(initialContext)

export const AppProvider = (props: IAppContextsProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated)
  const [profile, setProfile] = useState<IUser | null>(initialContext.profile)

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      profile,
      setIsAuthenticated,
      setProfile
    }),
    [isAuthenticated, setIsAuthenticated, profile, setProfile]
  )
  return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
}

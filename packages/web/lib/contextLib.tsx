import { useContext, createContext, useState } from 'react'

type authContextType = {
  session: string | null
  setSession: (session: string | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const AppContext = createContext<authContextType>({
  session: null,
  setSession: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
})

export const AppContextProvider: React.FC = ({ children }: any) => {
  const [session, setSession] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  return (
    <AppContext.Provider
      value={{ session, setSession, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

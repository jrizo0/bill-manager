import React, { createContext, useState } from 'react'

interface SessionContextProps {
  token: string | null
  setToken: (token: string | null) => void
}

export const TokenContext = createContext<SessionContextProps>({
  token: null,
  setToken: () => { },
})

interface SessionProviderProps {
  children: React.ReactNode
}

export function TokenProvider({ children }: SessionProviderProps) {
  const [token, setToken] = useState<string | null>(null)

  return (
    <TokenContext.Provider value={{ token: token, setToken: setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

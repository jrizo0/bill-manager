import React, { createContext, useState } from 'react'

interface SessionContextProps {
  session: string | null
  setSession: (token: string | null) => void
}

export const SessionContext = createContext<SessionContextProps>({
  session: null,
  setSession: () => {},
})

interface SessionProviderProps {
  children: React.ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<string | null>(null)

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}

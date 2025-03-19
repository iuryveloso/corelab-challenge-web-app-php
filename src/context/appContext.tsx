'use client'
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from 'react'

interface Context {
  token: string
  setToken: Dispatch<SetStateAction<string>>
}

export const AppContext = createContext<Context>({
  token: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken: function (_value: SetStateAction<string>): void {
    throw new Error('Function not implemented.')
  },
})

export default function AppProvider({ children }: { children: ReactElement }) {
  const tokenStorage =
    typeof localStorage !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : ''
  const [token, setToken] = useState(tokenStorage)

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}

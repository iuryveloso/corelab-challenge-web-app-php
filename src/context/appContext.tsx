'use client'
import { getTokenFromCookies } from '@/api/tokenApi'
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
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
  const [token, setToken] = useState('')

  useEffect(() => {
    async function getToken() {
      await getTokenFromCookies().then((e) => {
        if (e.token) setToken(e.token)
      })
    }
    getToken()
  }, [])

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  )
}

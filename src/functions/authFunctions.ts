import { login, logout, register } from '@/api/authApi'
import { Dispatch, SetStateAction } from 'react'
import { Credentials, Errors } from '@/interfaces/authInterfaces'
import { redirect } from 'next/navigation'
import { User } from '@/interfaces/userInterfaces'
import { setTokenOnCookies } from '@/api/tokenApi'

interface AuthFunctions {
  setErrors: Dispatch<SetStateAction<Errors['errors']>>
  setMessage: Dispatch<SetStateAction<string>>
  setToken: Dispatch<SetStateAction<string>>
}

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).errors !== undefined

export async function authLogin(
  user: User,
  credentials: Credentials,
  setErrors: AuthFunctions['setErrors'],
  setMessage: AuthFunctions['setMessage'],
  setToken: AuthFunctions['setToken']
) {
  const { email } = user
  const { password } = credentials
  await login(email, password).then(async (data) => {
    if (isErrors(data)) {
      setErrors(data.errors)
      return
    }
    await setTokenOnCookies(data.token).then((e) => {
      setToken(data.token)
      setMessage(e.message)
      redirect('/dashboard')
    })
  })
}

export async function authRegister(
  user: User,
  credentials: Credentials,
  setErrors: AuthFunctions['setErrors'],
  setMessage: AuthFunctions['setMessage'],
  setToken: AuthFunctions['setToken']
) {
  const { name, email } = user
  const { password, password_confirmation } = credentials
  await register(name, email, password, password_confirmation).then(
    async (data) => {
      if (isErrors(data)) {
        setErrors(data.errors)
        return
      }
      await setTokenOnCookies(data.token).then((e) => {
        setMessage(e.message)
        setToken(data.token)
        redirect('/dashboard')
      })
    }
  )
}

export async function authLogout(
  setMessage: AuthFunctions['setMessage'],
  setToken: AuthFunctions['setToken'],
  token: string
) {
  await logout(token as string).then(async (data) => {
    await setTokenOnCookies('').then(() => {
      setMessage(data.message)
      setToken('')
      redirect('/login')
    })
  })
}

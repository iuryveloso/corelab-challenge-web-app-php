import { login, logout, register } from '@/api/authApi'
import { Dispatch, SetStateAction } from 'react'
import { Credentials, Errors } from '@/interfaces/authInterfaces'
import { redirect } from 'next/navigation'
import { User } from '@/interfaces/userInterfaces'

interface AuthFunctions {
  setErrors: Dispatch<
    SetStateAction<{
      name?: Array<string>
      email?: Array<string>
      file?: Array<string>
      password?: Array<string>
    }>
  >
  setMessage: Dispatch<SetStateAction<string>>
  setToken: Dispatch<SetStateAction<string>>
}

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).errors !== undefined

export function isLoggedIn() {
  if (!localStorage.getItem('token')) redirect('/login')
}

export async function authLogin(
  user: User,
  credentials: Credentials,
  setErrors: AuthFunctions['setErrors'],
  setToken: AuthFunctions['setToken']
) {
  const { email } = user
  const { password } = credentials
  await login(email, password).then((data) => {
    if (isErrors(data)) setErrors(data.errors)
    else {
      localStorage.setItem('token', data.token)
      if (setToken) setToken(data.token)
      redirect('/dashboard')
    }
  })
}

export async function authRegister(
  user: User,
  file: File,
  credentials: Credentials,
  setErrors: AuthFunctions['setErrors'],
  setToken: AuthFunctions['setToken']
) {
  const { name, email } = user
  const { password, password_confirmation } = credentials
  await register(name, email, file, password, password_confirmation).then(
    (data) => {
      if (isErrors(data)) setErrors(data.errors)
      else {
        localStorage.setItem('token', data.token)
        if (setToken) setToken(data.token)
        redirect('/dashboard')
      }
    }
  )
}

export async function authLogout(
  setMessage: AuthFunctions['setMessage'],
  setToken: AuthFunctions['setToken'],
  token: string
) {
  await logout(token as string).then((data) => {
    setMessage(data.message)
    localStorage.removeItem('token')
    if (setToken) setToken('')
    redirect('/login')
  })
}

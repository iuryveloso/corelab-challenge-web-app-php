import { show, update, updateAvatar, updatePassword } from '@/api/userApi'
import { Dispatch, SetStateAction } from 'react'
import { User, Errors, Unauthenticated } from '@/interfaces/userInterfaces'
import { redirect } from 'next/navigation'

interface UserFunctions {
  setErrors: Dispatch<SetStateAction<Errors['errors']>>
  setMessage: Dispatch<SetStateAction<string>>
  setUser: Dispatch<SetStateAction<User>>
}

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).errors !== undefined

const isUnauthenticated = (value: unknown): value is Unauthenticated =>
  (value as Unauthenticated).unauthenticated !== undefined

export async function userShow(
  setUser: UserFunctions['setUser'],
  token: string
) {
  await show(token).then((data) => {
    if (isUnauthenticated(data)) redirect('/login')
    setUser(data)
  })
}

export async function userUpdate(
  user: User,
  setUser: UserFunctions['setUser'],
  token: string,
  setErrors: UserFunctions['setErrors'],
  setMessage: UserFunctions['setMessage']
) {
  const { name, email } = user
  await update(name, email, token).then((data) => {
    if (isUnauthenticated(data)) redirect('/login')
    if (isErrors(data)) {
      setErrors(data.errors)
      return
    }
    userShow(setUser, token)
    setMessage(data.message)
  })
}

export async function userUpdateAvatar(
  file: File,
  setUser: UserFunctions['setUser'],
  setErrors: UserFunctions['setErrors'],
  setMessage: UserFunctions['setMessage'],
  token: string
) {
  await updateAvatar(file, token).then((data) => {
    if (isUnauthenticated(data)) redirect('/login')
    if (isErrors(data)) {
      setErrors(data.errors)
      return
    }
    userShow(setUser, token)
    setMessage(data.message)
  })
}

export async function userUpdatePassword(
  credentials: {
    old_password: string
    password: string
    password_confirmation: string
  },
  setErrors: UserFunctions['setErrors'],
  setMessage: UserFunctions['setMessage'],
  token: string
) {
  const { old_password, password, password_confirmation } = credentials
  await updatePassword(
    old_password,
    password,
    password_confirmation,
    token
  ).then((data) => {
    if (isUnauthenticated(data)) redirect('/login')
    if (isErrors(data)) {
      setErrors(data.errors)
      return
    }
    setMessage(data.message)
  })
}

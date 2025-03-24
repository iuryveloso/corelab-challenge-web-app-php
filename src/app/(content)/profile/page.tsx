'use client'
import { AppContext } from '@/context/appContext'
import Image from 'next/image'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import {
  userUpdate,
  userUpdateAvatar,
  userUpdatePassword,
} from '@/functions/userFunctions'
import Input from '@/components/input'
import { userShow } from '@/functions/userFunctions'
import { Errors, User } from '@/interfaces/userInterfaces'
import NavProfile from '@/components/navProfile'
import Button from '@/components/button'
import { Credentials } from '@/interfaces/authInterfaces'
import { authLogout } from '@/functions/authFunctions'

export default function Profile() {
  const { token, setToken } = useContext(AppContext)
  const imagesDomain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/storage/uploads/`

  const emptyCredentials = {
    old_password: '',
    password: '',
    password_confirmation: '',
  }

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar: '',
  })
  const [credentials, setCredentials] = useState<Credentials>(emptyCredentials)
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    password: false,
    password_confirmation: false,
  })
  const [errors, setErrors] = useState<Errors['errors']>({})
  const [showErrors, setShowErrors] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setShowErrors(true)
      setTimeout(() => {
        setErrors({})
        setShowErrors(false)
      }, 3000)
    }
  }, [errors])

  useEffect(() => {
    if (message) {
      setShowMessage(true)
      setTimeout(() => {
        setMessage('')
        setShowMessage(false)
      }, 3000)
    }
  }, [message])

  useEffect(() => {
    if (token) userShow(setUser, token)
  }, [token])

  function onCLickOldPasswordIcon() {
    setShowPassword({
      ...showPassword,
      old_password: !showPassword.old_password,
    })
  }

  function onCLickPasswordIcon() {
    setShowPassword({
      ...showPassword,
      password: !showPassword.password,
    })
  }

  function onCLickPasswordConfirmationIcon() {
    setShowPassword({
      ...showPassword,
      password_confirmation: !showPassword.password_confirmation,
    })
  }

  function updateUserClick() {
    userUpdate(user, setUser, token, setErrors, setMessage)
  }
  function updatePasswordClick() {
    userUpdatePassword(credentials, setErrors, setMessage, token)
    setCredentials(emptyCredentials)
  }

  function fileupload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    userUpdateAvatar(files[0], setUser, setErrors, setMessage, token)
  }

  function updateAvatarClick() {
    if (!inputRef || !inputRef.current) return

    inputRef.current.click()
  }

  function onClickLogout() {
    authLogout(setMessage, setToken, token)
  }

  return (
    <div>
      <div className={'relative'}>
        <div className={'fixed inset-x-0 top-0'}>
          <nav
            className={
              'flex flex-col flex-wrap bg-white px-5 py-1 shadow-md sm:flex-row'
            }
          >
            <div className={'mb-3 flex items-center sm:mb-0'}>
              <div className={'mr-1'}>
                <a href="/dashboard">
                  <Image
                    src={'/logo.svg'}
                    width={35}
                    height={35}
                    alt={'Main logo'}
                    priority={true}
                  />
                </a>
              </div>
              <label className={'mr-7 text-xl text-gray-500'}>CoreNotes</label>
              <div className={'flex grow justify-end'}>
                <div className={'sm:hidden'}>
                  <NavProfile user={user} onClickLogout={onClickLogout} />
                </div>
              </div>
            </div>
            <div className={'flex grow justify-end'}>
              <div className={'hidden sm:block'}>
                <NavProfile user={user} onClickLogout={onClickLogout} />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className={'mt-16'}>
        <div className={'relative z-0'}>
          <div className={'fixed inset-y-14 right-0 z-10 mr-2'}>
            <div className={'flex flex-col'}>
              <div
                className={`mt-1 flex flex-col items-center rounded-sm bg-red-300 px-3 py-2 shadow-md ${showErrors ? '' : 'hidden'}`}
              >
                {errors ? (
                  <>
                    {errors.name?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                    {errors.email?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                    {errors.file?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                    {errors.password?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                    {errors.old_password?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                  </>
                ) : (
                  false
                )}
              </div>
              <div
                className={`mt-1 flex flex-col items-center rounded-sm bg-green-300 px-3 py-2 shadow-md ${showMessage ? '' : 'hidden'}`}
              >
                {message ? <label>{message}</label> : false}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={'flex flex-col items-center'}>
        <div className={'container flex justify-center'}>
          <div
            className={
              'mb-2 w-11/12 rounded-xl bg-white py-2 text-center shadow-md lg:w-4/5'
            }
          >
            <h2 className={'mt-1 text-2xl'}>Perfil de Usuário</h2>
          </div>
        </div>

        <div className={'container flex flex-wrap justify-center'}>
          <div className={`mb-2 flex w-11/12 pr-0 lg:w-1/5 lg:pr-2`}>
            <div
              className={`h-full w-full rounded-xl bg-white px-5 pt-4 pb-3 shadow-md`}
            >
              <div className={'mb-3 flex justify-center'}>
                {user.avatar ? (
                  <Image
                    loader={({src})=> src}
                    unoptimized={true}
                    src={`${imagesDomain}${user.avatar}`}
                    width={250}
                    height={250}
                    alt={'Profile'}
                    priority={true}
                    className={`h-36 w-36 rounded-full border border-gray-300 shadow-md`}
                  />
                ) : (
                  <Image
                    src={'/user.svg'}
                    width={250}
                    height={250}
                    alt={'Profile'}
                    priority={true}
                    className={`h-36 w-36 rounded-full border border-gray-300 shadow-md`}
                  />
                )}
              </div>
              <div>
                <Button
                  text={'Alterar Imagem'}
                  color={'bg-amber-200'}
                  onClick={updateAvatarClick}
                />
                <input
                  type={'file'}
                  accept={'image/png, image/jpeg, .svg'}
                  hidden
                  ref={inputRef}
                  onChange={(e) => fileupload(e)}
                />
              </div>
            </div>
          </div>
          <div
            className={
              'mb-2 w-11/12 rounded-xl bg-white px-5 py-3 shadow-md lg:w-3/5'
            }
          >
            <div className={'mb-5'}>
              <label htmlFor={'nameInput'}>Nome</label>
              <Input
                value={user.name}
                id={'nameInput'}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder={'Seu nome completo...'}
              />
            </div>
            <div className={'mb-5'}>
              <label htmlFor={'emailInput'}>Email</label>
              <Input
                value={user.email}
                id={'emailInput'}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder={'Seu email válido...'}
              />
            </div>
            <div>
              <Button
                text={'Alterar Dados'}
                color={'bg-green-300'}
                onClick={updateUserClick}
              />
            </div>
          </div>
          <div
            className={
              'w-11/12 rounded-xl bg-white px-5 py-3 shadow-md lg:w-4/5'
            }
          >
            <div className={'mb-5'}>
              <label htmlFor={'old_passwordInput'}>Senha Atual</label>
              <Input
                type={showPassword.old_password ? 'text' : 'password'}
                value={credentials.old_password}
                id={'old_passwordInput'}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    old_password: e.target.value,
                  })
                }
                icon={
                  showPassword.old_password
                    ? '/icons/eye_slash.svg'
                    : '/icons/eye.svg'
                }
                iconSize={28}
                onCLickIcon={onCLickOldPasswordIcon}
                placeholder={'Sua senha atual...'}
              />
            </div>
            <div className={'mb-5'}>
              <label htmlFor={'passwordInput'}>Nova Senha</label>
              <Input
                type={showPassword.password ? 'text' : 'password'}
                value={credentials.password}
                id={'passwordInput'}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                icon={
                  showPassword.password
                    ? '/icons/eye_slash.svg'
                    : '/icons/eye.svg'
                }
                iconSize={28}
                onCLickIcon={onCLickPasswordIcon}
                placeholder={'Nova senha...'}
              />
            </div>
            <div className={'mb-5'}>
              <label htmlFor={'password_confirmationInput'}>
                Confirmar Senha
              </label>
              <Input
                type={showPassword.password_confirmation ? 'text' : 'password'}
                value={credentials.password_confirmation}
                id={'password_confirmationInput'}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password_confirmation: e.target.value,
                  })
                }
                icon={
                  showPassword.password_confirmation
                    ? '/icons/eye_slash.svg'
                    : '/icons/eye.svg'
                }
                iconSize={28}
                onCLickIcon={onCLickPasswordConfirmationIcon}
                placeholder={'Confirmação de senha...'}
              />
            </div>
            <div>
              <Button
                text={'Alterar Senha'}
                color={'bg-indigo-300'}
                onClick={updatePasswordClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

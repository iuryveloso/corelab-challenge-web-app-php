'use client'
import { AppContext } from '@/context/appContext'
import {
  todoIndex,
  todoUpdate,
  todoDestroy,
  todoStore,
  todoSearch,
  todoRestore,
} from '@/functions/todoFunctions'
import { Errors, Todo } from '@/interfaces/todoInterfaces'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import Input from '@/components/input'
import Card from '@/components/card'
import { userShow } from '@/functions/userFunctions'
import { User } from '@/interfaces/userInterfaces'
import CardButton from '@/components/cardButton'
import NavProfile from '@/components/navProfile'
import { authLogout } from '@/functions/authFunctions'

export default function Login() {
  const emptyTodo: Todo = {
    id: '',
    title: '',
    body: '',
    color: 'white',
    favorited: false,
  }
  const { token, setToken } = useContext(AppContext)

  const [search, setSearch] = useState('')
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar: '',
  })
  const [errors, setErrors] = useState<Errors['errors']>({})
  const [showErrors, setShowErrors] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [shownTodos, setShownTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<Todo>(emptyTodo)
  const [showRestore, setShowRestore] = useState<{
    visible: boolean
    todo: Todo
  }>({
    visible: false,
    todo: emptyTodo,
  })

  const getIconFavorited = todo.favorited
    ? '/icons/star_fill.svg'
    : '/icons/star.svg'

  function OnClickCardButton(
    type: 'edit' | 'color' | 'favorite' | 'delete' | 'save'
  ) {
    if (type === 'favorite') setTodo({ ...todo, favorited: !todo.favorited })
    if (type === 'save') {
      todoStore(todo, setTodos, setErrors, setMessage, token)
      setTodo(emptyTodo)
    }
  }

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
    if (token) todoIndex(setTodos, token)
    if (token) userShow(setUser, token)
  }, [token])

  useEffect(() => {
    if (search) setShownTodos(todoSearch(search, todos))
    else setShownTodos(todos)
  }, [todos, search])

  function hasFavorited() {
    return (
      shownTodos.reduce((curr, todo) => (todo.favorited ? curr + 1 : curr), 0) >
      0
    )
  }

  function hasOther() {
    return (
      shownTodos.reduce(
        (curr, todo) => (!todo.favorited ? curr + 1 : curr),
        0
      ) > 0
    )
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
            <div
              className={'flex items-center justify-center md:justify-start'}
            >
              <div className={'w-80 lg:w-2xl'}>
                <Input
                  icon={'/icons/search.svg'}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  iconSize={20}
                  placeholder={'Pesquisar notas'}
                />
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

      <div className={'mt-28 sm:mt-16'}>
        <div className={'relative z-0'}>
          <div className={'fixed inset-y-14 right-0 z-10 mr-2'}>
            <div className={'flex flex-col'}>
              <div
                className={`mt-1 flex flex-col items-center rounded-sm bg-red-300 px-3 py-2 shadow-md ${showErrors ? '' : 'hidden'}`}
              >
                {errors ? (
                  <>
                    {errors.title?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                    {errors.body?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                    {errors.color?.map((error, key) => (
                      <label key={key}>{error}</label>
                    ))}
                    {errors.favorited?.map((error, key) => (
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
                {showRestore.visible &&
                Object.keys(showRestore.todo).length !== 0 ? (
                  <button
                    className={`m-1 cursor-pointer rounded-sm bg-white px-2 py-1 shadow-md`}
                    onClick={() => {
                      todoRestore(
                        showRestore.todo.id,
                        setTodos,
                        setMessage,
                        token
                      )
                      setShowRestore({
                        visible: false,
                        todo: emptyTodo,
                      })
                    }}
                  >
                    Restaurar
                  </button>
                ) : (
                  false
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={'mt-3 flex justify-center'}>
          <div className={'h-40 w-80 rounded-2xl bg-white shadow-md lg:w-2xl'}>
            <div className={'flex border-b border-gray-400'}>
              <input
                type={'text'}
                className={'grow px-3 py-2 font-semibold outline-none'}
                placeholder={'Título'}
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <CardButton
                icon={getIconFavorited}
                className={'mx-3 my-2 h-auto w-5'}
                type={'favorite'}
                onClickButton={OnClickCardButton}
              />
            </div>
            <div className={'flex'}>
              <textarea
                className={`grow resize-none px-3 py-2 outline-none`}
                placeholder={'Criar nota...'}
                value={todo.body}
                rows={4}
                onChange={(e) => setTodo({ ...todo, body: e.target.value })}
              />
              <div className={'flex flex-col justify-end'}>
                <CardButton
                  icon={'/icons/save.svg'}
                  className={'mx-3 my-2 h-auto w-5'}
                  type={'save'}
                  onClickButton={OnClickCardButton}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-wrap justify-center'}>
          <div>
            {hasFavorited() ? (
              <div className={'mt-5 text-center'}>
                <h3 className={'text-xl'}>Favoritos</h3>
              </div>
            ) : (
              false
            )}
            <div className={'flex flex-wrap justify-center'}>
              {shownTodos
                .filter((todo) => todo.favorited)
                .map((todo, key) => {
                  return (
                    <div className={'flex'} key={key}>
                      <Card
                        todo={todo}
                        emptyTodo={emptyTodo}
                        setTodos={setTodos}
                        setErrors={setErrors}
                        setMessage={setMessage}
                        todoUpdate={todoUpdate}
                        todoDestroy={todoDestroy}
                        setShowRestore={setShowRestore}
                        token={token}
                      />
                    </div>
                  )
                })}
            </div>
          </div>
          <div>
            {hasOther() ? (
              <div className={'mt-5 text-center'}>
                <h3 className={'text-xl'}>Outros</h3>
              </div>
            ) : (
              false
            )}
            <div className={'flex flex-wrap justify-center'}>
              {shownTodos
                .filter((todo) => !todo.favorited)
                .map((todo, key) => {
                  return (
                    <div className={'flex'} key={key}>
                      <Card
                        todo={todo}
                        emptyTodo={emptyTodo}
                        setTodos={setTodos}
                        setErrors={setErrors}
                        setMessage={setMessage}
                        todoUpdate={todoUpdate}
                        todoDestroy={todoDestroy}
                        setShowRestore={setShowRestore}
                        token={token}
                      />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

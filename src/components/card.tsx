'use client'
import { Todo } from '@/interfaces/todoInterfaces'
import CardButton from './cardButton'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CardColorButton from './cardColorButton'

interface Card {
  todo: Todo
  emptyTodo: Todo
  setTodos: Dispatch<SetStateAction<Todo[]>>
  setErrors: Dispatch<
    SetStateAction<{
      title?: Array<string>
      body?: Array<string>
      color?: Array<string>
      favorited?: Array<string>
    }>
  >
  setMessage: Dispatch<SetStateAction<string>>
  setShowRestore: Dispatch<
    SetStateAction<{
      visible: boolean
      todo: Todo
    }>
  >
  token: string
  todoUpdate: (
    todo: Todo,
    setTodos: Card['setTodos'],
    setErrors: Card['setErrors'],
    setMessage: Card['setMessage'],
    token: string
  ) => void
  todoDestroy: (
    id: string,
    setTodos: Card['setTodos'],
    setMessage: Card['setMessage'],
    token: string
  ) => void
}

export default function Card({
  todo,
  emptyTodo,
  setTodos,
  setErrors,
  setMessage,
  token,
  todoUpdate,
  todoDestroy,
  setShowRestore,
}: Card) {
  const [colorPick, setColorPick] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [editedTodo, setEditedTodo] = useState<Todo>(emptyTodo)

  useEffect(() => {
    setEditedTodo(todo)
  }, [todo])

  function OnClickButton(
    type: 'edit' | 'color' | 'favorite' | 'delete' | 'save'
  ) {
    if (type === 'edit') {
      if (!readOnly) {
        todoUpdate(
          { ...todo, title: editedTodo.title, body: editedTodo.body },
          setTodos,
          setErrors,
          setMessage,
          token
        )
      }
      setReadOnly(!readOnly)
    }
    if (type === 'color') setColorPick(!colorPick)
    if (type === 'favorite')
      todoUpdate(
        { ...todo, favorited: !todo.favorited },
        setTodos,
        setErrors,
        setMessage,
        token
      )
    if (type === 'delete') {
      todoDestroy(todo.id, setTodos, setMessage, token)
      setShowRestore({ visible: true, todo: editedTodo })
    }
  }

  function editColor(color: Todo['color']) {
    const whiteColorCheck = color === todo.color ? 'white' : color
    todoUpdate(
      { ...todo, color: whiteColorCheck },
      setTodos,
      setErrors,
      setMessage,
      token
    )
    setColorPick(!colorPick)
  }

  const colorList: Todo['color'][] = [
    'blue',
    'teal',
    'yellow',
    'salmon',
    'red',
    'sky',
  ]

  const colorList2: Todo['color'][] = [
    'pink',
    'lime',
    'orange',
    'cloud',
    'gray',
    'brown',
  ]

  const titleBorder =
    todo.color !== 'white' ? 'border-white' : 'border-gray-400'
  const getIconFavorited = todo.favorited
    ? '/icons/star_fill.svg'
    : '/icons/star.svg'
  const getIconEdit = readOnly ? '/icons/edit.svg' : '/icons/save.svg'
  return (
    <div className={'flex flex-col'}>
      <div
        className={`m-5 flex h-96 w-80 flex-col rounded-2xl shadow-md ${`bg-card-${todo.color}`} ${readOnly ? '' : 'border border-gray-400'} `}
      >
        <div className={`flex items-start border-b ${titleBorder} `}>
          <input
            className={`grow resize-none rounded-tl-2xl px-3 py-2 font-semibold outline-none`}
            value={editedTodo.title}
            readOnly={readOnly}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, title: e.target.value })
            }
          />
          <CardButton
            icon={getIconFavorited}
            className={'mx-3 my-2 h-auto w-5'}
            type={'favorite'}
            onClickButton={OnClickButton}
          />
        </div>
        <textarea
          className={`grow resize-none px-3 py-2 outline-none`}
          value={editedTodo.body}
          readOnly={readOnly}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, body: e.target.value })
          }
        />
        <div className={'flex items-center px-3 py-2'}>
          <div className={'grow'}>
            <CardButton
              icon={getIconEdit}
              className={'h-auto w-5'}
              type={'edit'}
              onClickButton={OnClickButton}
            />
            <CardButton
              icon={'/icons/paint.svg'}
              className={'h-auto w-5'}
              type={'color'}
              onClickButton={OnClickButton}
            />
          </div>
          <div>
            <CardButton
              icon={'/icons/delete.svg'}
              className={'h-auto w-4'}
              type={'delete'}
              onClickButton={OnClickButton}
            />
          </div>
        </div>
      </div>
      {colorPick ? (
        <div
          className={`z-10 -mt-8 -mb-12 ml-10 h-20 w-60 rounded-2xl bg-white p-1 shadow-md`}
        >
          <div className={'mb-2 flex justify-between'}>
            {colorList.map((color, key) => {
              if (color)
                return (
                  <CardColorButton
                    key={key}
                    color={color}
                    editColor={editColor}
                  />
                )
            })}
          </div>
          <div className={'flex justify-between'}>
            {colorList2.map((color, key) => {
              if (color)
                return (
                  <CardColorButton
                    key={key}
                    color={color}
                    editColor={editColor}
                  />
                )
            })}
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  )
}

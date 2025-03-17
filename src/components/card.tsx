"use client";
import { Todo } from "@/interfaces/todoInterfaces";
import CardButton from "./cardButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CardColorButton from "./cardColorButton";

interface Card {
  todo: Todo;
  emptyTodo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setErrors: Dispatch<
    SetStateAction<{
      title?: Array<string>;
      body?: Array<string>;
      color?: Array<string>;
      favorited?: Array<string>;
    }>
  >;
  setMessage: Dispatch<SetStateAction<string>>;
  setShowRestore: Dispatch<
    SetStateAction<{
      visible: boolean;
      todo: Todo;
    }>
  >;
  token: string;
  todoUpdate: (
    todo: Todo,
    setTodos: Card["setTodos"],
    setErrors: Card["setErrors"],
    setMessage: Card["setMessage"],
    token: string
  ) => void;
  todoDestroy: (
    id: string,
    setTodos: Card["setTodos"],
    setMessage: Card["setMessage"],
    token: string
  ) => void;
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
  setShowRestore
}: Card) {
  const [colorPick, setColorPick] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [editedTodo, setEditedTodo] = useState<Todo>(emptyTodo);

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  function OnClickButton(
    type: "edit" | "color" | "favorite" | "delete" | "save"
  ) {
    if (type === "edit") {
      if (!readOnly) {
        todoUpdate(
          { ...todo, title: editedTodo.title, body: editedTodo.body },
          setTodos,
          setErrors,
          setMessage,
          token
        );
      }
      setReadOnly(!readOnly);
    }
    if (type === "color") setColorPick(!colorPick);
    if (type === "favorite")
      todoUpdate(
        { ...todo, favorited: !todo.favorited },
        setTodos,
        setErrors,
        setMessage,
        token
      );
    if (type === "delete") {
      todoDestroy(todo.id, setTodos, setMessage, token);
      setShowRestore({visible: true, todo: editedTodo})
    }
  }

  function editColor(color: Todo["color"]) {
    const whiteColorCheck = color === todo.color ? "white" : color;
    todoUpdate(
      { ...todo, color: whiteColorCheck },
      setTodos,
      setErrors,
      setMessage,
      token
    );
    setColorPick(!colorPick);
  }

  const colorList: Todo["color"][] = [
    "blue",
    "teal",
    "yellow",
    "salmon",
    "red",
    "sky",
  ];

  const colorList2: Todo["color"][] = [
    "pink",
    "lime",
    "orange",
    "cloud",
    "gray",
    "brown",
  ];

  const titleBorder =
    todo.color !== "white" ? "border-white" : "border-gray-400";
  const getIconFavorited = todo.favorited
    ? "/icons/star_fill.svg"
    : "/icons/star.svg";
  const getIconEdit = readOnly ? "/icons/edit.svg" : "/icons/save.svg";
  return (
    <div className={"flex flex-col"}>
      <div
        className={`
          flex flex-col shadow-md 
          w-80 h-96 m-5 rounded-2xl 
          ${`bg-card-${todo.color}`}
          ${readOnly ? "" : "border border-gray-400"}
        `}
      >
        <div
          className={`
            flex items-start border-b ${titleBorder}
          `}
        >
          <input
            className={`
              grow outline-none resize-none px-3 py-2 rounded-tl-2xl font-semibold
            `}
            value={editedTodo.title}
            readOnly={readOnly}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, title: e.target.value })
            }
          />
          <CardButton
            icon={getIconFavorited}
            className={"w-5 h-auto mx-3 my-2"}
            type={"favorite"}
            onClickButton={OnClickButton}
          />
        </div>
        <textarea
          className={`
            grow px-3 py-2 resize-none outline-none
          `}
          value={editedTodo.body}
          readOnly={readOnly}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, body: e.target.value })
          }
        />
        <div className={"flex px-3 py-2 items-center"}>
          <div className={"grow"}>
            <CardButton
              icon={getIconEdit}
              className={"w-5 h-auto"}
              type={"edit"}
              onClickButton={OnClickButton}
            />
            <CardButton
              icon={"/icons/paint.svg"}
              className={"w-5 h-auto"}
              type={"color"}
              onClickButton={OnClickButton}
            />
          </div>
          <div>
            <CardButton
              icon={"/icons/delete.svg"}
              className={"w-4 h-auto"}
              type={"delete"}
              onClickButton={OnClickButton}
            />
          </div>
        </div>
      </div>
      {colorPick ? (
        <div
          className={`
          w-60 h-20 bg-white shadow-md 
          rounded-2xl ml-10 -mt-8 -mb-12 p-1
          z-10
        `}
        >
          <div className={"flex justify-between mb-2"}>
            {colorList.map((color, key) => {
              if (color)
                return (
                  <CardColorButton
                    key={key}
                    color={color}
                    editColor={editColor}
                  />
                );
            })}
          </div>
          <div className={"flex justify-between"}>
            {colorList2.map((color, key) => {
              if (color)
                return (
                  <CardColorButton
                    key={key}
                    color={color}
                    editColor={editColor}
                  />
                );
            })}
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}

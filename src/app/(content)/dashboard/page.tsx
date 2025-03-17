"use client";
import { AppContext } from "@/context/appContext";
import {
  todoIndex,
  todoUpdate,
  todoDestroy,
  todoStore,
  todoSearch,
  todoRestore,
} from "@/functions/todoFunctions";
import { Todo } from "@/interfaces/todoInterfaces";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/input";
import Card from "@/components/card";
import { userShow } from "@/functions/userFunctions";
import { User } from "@/interfaces/userInterfaces";
import CardButton from "@/components/cardButton";

interface Errors {
  title?: Array<string>;
  body?: Array<string>;
  color?: Array<string>;
  favorited?: Array<string>;
}

export default function Login() {
  const emptyTodo: Todo = {
    id: "",
    title: "",
    body: "",
    color: "white",
    favorited: false,
  };
  const { token } = useContext(AppContext);
  const domain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/storage/uploads/`;

  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User>({ name: "", email: "", avatar: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [shownTodos, setShownTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>(emptyTodo);
  const [showRestore, setShowRestore] = useState<{
    visible: boolean;
    todo: Todo;
  }>({
    visible: false,
    todo: emptyTodo,
  });

  const getIconFavorited = todo.favorited
    ? "/icons/star_fill.svg"
    : "/icons/star.svg";
  function OnClickCardButton(
    type: "edit" | "color" | "favorite" | "delete" | "save"
  ) {
    if (type === "favorite") setTodo({ ...todo, favorited: !todo.favorited });
    if (type === "save") {
      todoStore(todo, setTodos, setErrors, setMessage, token);
      setTodo(emptyTodo);
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setShowErrors(true);
      setTimeout(() => {
        setErrors({});
        setShowErrors(false);
      }, 3000);
    }
  }, [errors]);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setTimeout(() => {
        setMessage("");
        setShowMessage(false);
      }, 3000);
    }
  }, [message]);

  useEffect(() => {
    if (token) todoIndex(setTodos, token);
    if (token) userShow(setUser, token);
  }, [token]);

  useEffect(() => {
    if (search) setShownTodos(todoSearch(search, todos));
    else setShownTodos(todos);
  }, [todos, search]);

  return (
    <div>
      <div className={"relative"}>
        <div className={"fixed inset-x-0 top-0"}>
          <nav
            className={
              "flex flex-wrap py-1 px-2 shadow-md bg-white flex-col sm:flex-row"
            }
          >
            <div className={"flex items-center mr-3 mb-3 sm:mb-0"}>
              <div className={"mr-1 "}>
                <Image
                  src={"/logo.svg"}
                  width={35}
                  height={35}
                  alt={"Main logo"}
                  priority={true}
                />
              </div>
              <label className={" mr-7 text-xl  text-gray-500"}>
                CoreNotes
              </label>
              <div className={"flex grow  justify-end"}>
                <div className={"sm:hidden"}>
                  <div className={"flex items-center"}>
                    <label className={"mx-2"}>{user.name.split(" ")[0]}</label>
                    {user.avatar ? (
                      <Image
                        src={`${domain}${user.avatar}`}
                        width={70}
                        height={70}
                        alt={"Main logo"}
                        priority={true}
                        className={
                          "rounded-full w-10 h-10 border border-gray-300 shadow-md"
                        }
                      />
                    ) : (
                      false
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={"flex justify-center md:justify-start items-center "}
            >
              <div className={"w-80 lg:w-2xl"}>
                <Input
                  icon={"/icons/search.svg"}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder={"Pesquisar notas"}
                />
              </div>
            </div>
            <div className={"flex grow  justify-end"}>
              <div className={" hidden sm:block"}>
                <div className={"flex items-center"}>
                  <label className={"mx-2"}>{user.name.split(" ")[0]}</label>
                  {user.avatar ? (
                    <Image
                      src={`${domain}${user.avatar}`}
                      width={70}
                      height={70}
                      alt={"Main logo"}
                      priority={true}
                      className={
                        "rounded-full w-10 h-10 border border-gray-300 shadow-md"
                      }
                    />
                  ) : (
                    false
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className={'mt-16'}>
        <div className={"relative z-0"}>
          <div className={"z-10 fixed right-0 inset-y-14 mr-2"}>
            <div className={"flex flex-col"}>
              <div
                className={`flex flex-col items-center bg-red-300 
              mt-1 px-3 py-2 rounded-sm shadow-md 
              ${showErrors ? "" : "hidden"}`}
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
                className={`flex flex-col items-center bg-green-300 
              mt-1 px-3 py-2 rounded-sm shadow-md
              ${showMessage ? "" : "hidden"}`}
              >
                {message ? <label>{message}</label> : false}
                {showRestore.visible &&
                Object.keys(showRestore.todo).length !== 0 ? (
                  <button
                    className={`
                      m-1 px-2 py-1 bg-white shadow-md 
                      rounded-sm cursor-pointer
                    `}
                    onClick={() => {
                      todoRestore(
                        showRestore.todo.id,
                        setTodos,
                        setMessage,
                        token
                      );
                      setShowRestore({
                        visible: false,
                        todo: emptyTodo,
                      });
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

        <div className={"flex justify-center mt-3"}>
          <div className={"w-80 lg:w-2xl h-40 shadow-md bg-white rounded-2xl"}>
            <div className={"flex border-b border-gray-400"}>
              <input
                type={"text"}
                className={"grow px-3 py-2 font-semibold outline-none"}
                placeholder={"Título"}
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <CardButton
                icon={getIconFavorited}
                className={"w-5 h-auto mx-3 my-2"}
                type={"favorite"}
                onClickButton={OnClickCardButton}
              />
            </div>
            <div className={"flex"}>
              <textarea
                className={`
                  grow px-3 py-2 resize-none outline-none
                `}
                placeholder={"Criar nota..."}
                value={todo.body}
                rows={4}
                onChange={(e) => setTodo({ ...todo, body: e.target.value })}
              />
              <div className={"flex flex-col justify-end"}>
                <CardButton
                  icon={"/icons/save.svg"}
                  className={"w-5 h-auto mx-3 my-2"}
                  type={"save"}
                  onClickButton={OnClickCardButton}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={"flex flex-wrap justify-center"}>
          {shownTodos.map((todo, key) => {
            return (
              <div className={"flex"} key={key}>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { index, store, show, update, destroy, restore } from "@/api/todoApi";
import { Dispatch, SetStateAction } from "react";
import { Todo, Errors, Unauthenticated } from "@/interfaces/todoInterfaces";
import { redirect } from "next/navigation";

interface TodoFunctions {
  setErrors: Dispatch<
    SetStateAction<{
      title?: Array<string>;
      body?: Array<string>;
      color?: Array<string>;
      favorited?: Array<string>;
    }>
  >;
  setMessage: Dispatch<SetStateAction<string>>;
  setTodo: Dispatch<SetStateAction<Todo>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setAllTodos: Dispatch<SetStateAction<Todo[]>>;
}

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).errors !== undefined;

const isUnauthenticated = (value: unknown): value is Unauthenticated =>
  (value as Unauthenticated).unauthenticated !== undefined;

export function todoSearch(search: string, todos: Todo[]) {
  return todos.filter((todo) => {
    const lowerSearch = search.toLowerCase();
    const lowerTitle = todo.title.toLowerCase();
    const lowerBody = todo.body.toLowerCase();
    return lowerTitle.includes(lowerSearch) || lowerBody.includes(lowerSearch);
  });
}

export async function todoIndex(
  setTodos: TodoFunctions["setTodos"],
  token: string
) {
  await index(token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else setTodos(data);
  });
}

export async function todoStore(
  todo: Todo,
  setTodos: TodoFunctions["setTodos"],
  setErrors: TodoFunctions["setErrors"],
  setMessage: TodoFunctions["setMessage"],
  token: string
) {
  const { body, color, favorited, title } = todo;
  await store(title, body, color, favorited, token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else if (isErrors(data)) setErrors(data.errors);
    else {
      todoIndex(setTodos, token);
      setMessage(data.message);
    }
  });
}

export async function todoShow(
  id: string,
  setTodo: TodoFunctions["setTodo"],
  token: string
) {
  await show(id, token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else setTodo(data);
  });
}

export async function todoUpdate(
  todo: Todo,
  setTodos: TodoFunctions["setTodos"],
  setErrors: TodoFunctions["setErrors"],
  setMessage: TodoFunctions["setMessage"],
  token: string
) {
  const { id, body, color, favorited, title } = todo;
  await update(id, title, body, color, favorited, token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else if (isErrors(data)) setErrors(data.errors);
    else {
      todoIndex(setTodos, token);
      setMessage(data.message);
    }
  });
}

export async function todoDestroy(
  id: string,
  setTodos: TodoFunctions["setTodos"],
  setMessage: TodoFunctions["setMessage"],
  token: string
) {
  await destroy(id, token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else {
      todoIndex(setTodos, token);
      setMessage(data.message);
    }
  });
}

export async function todoRestore(
  id: string,
  setTodos: TodoFunctions["setTodos"],
  setMessage: TodoFunctions["setMessage"],
  token: string
) {
  await restore(id, token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else {
      todoIndex(setTodos, token);
      setMessage(data.message);
    } 
  });
}

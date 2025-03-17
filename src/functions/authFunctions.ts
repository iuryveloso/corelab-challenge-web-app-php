import { login, logout, register } from "@/api/authApi";
import { Dispatch, SetStateAction } from "react";
import { Errors, Unauthenticated } from "@/interfaces/authInterfaces";
import { redirect } from "next/navigation";
import { User } from "@/interfaces/userInterfaces";

interface AuthFunctions {
  setErrors: Dispatch<
    SetStateAction<{
      name?: Array<string>;
      email?: Array<string>;
      file?: Array<string>;
      password?: Array<string>;
    }>
  >;
  setMessage: Dispatch<SetStateAction<string>>;
  setToken: Dispatch<SetStateAction<string>>;
}

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).errors !== undefined;

const isUnauthenticated = (value: unknown): value is Unauthenticated =>
  (value as Unauthenticated).unauthenticated !== undefined;

export async function authLogin(
  user: User,
  setErrors: AuthFunctions["setErrors"],
  setToken: AuthFunctions["setToken"]
) {
  const { email, password } = user;
  await login(email, password).then((data) => {
    if (isErrors(data)) setErrors(data.errors);
    else {
      localStorage.setItem("token", data.token);
      if (setToken) setToken(data.token);
    }
  });
}

export async function authRegister(
  user: User,
  setErrors: AuthFunctions["setErrors"],
  setToken: AuthFunctions["setToken"]
) {
  const { name, email, file, password, password_confirmation } = user;
  await register(name, email, file, password, password_confirmation).then(
    (data) => {
      if (isErrors(data)) setErrors(data.errors);
      else {
        localStorage.setItem("token", data.token);
        if (setToken) setToken(data.token);
      }
    }
  );
}

export async function authLogout(
  setMessage: AuthFunctions["setMessage"],
  setToken: AuthFunctions["setToken"],
  token: string
) {
  await logout(token as string).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else {
      setMessage(data.message);

      localStorage.removeItem("token");
      if (setToken) setToken("");
    }
  });
}

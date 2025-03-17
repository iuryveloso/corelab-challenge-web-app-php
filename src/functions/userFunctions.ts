import { show, update, updateAvatar, updatePassword } from "@/api/userApi";
import { Dispatch, SetStateAction } from "react";
import { User, Errors, Unauthenticated } from "@/interfaces/userInterfaces";
import { redirect } from "next/navigation";

interface UserFunctions {
  setErrors: Dispatch<
    SetStateAction<{
      name?: Array<string>;
      email?: Array<string>;
      file?: Array<string>;
      password?: Array<string>;
    }>
  >;
  setMessage: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<User>>;
}

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).errors !== undefined;

const isUnauthenticated = (value: unknown): value is Unauthenticated =>
  (value as Unauthenticated).unauthenticated !== undefined;

export async function userShow(
  setUser: UserFunctions["setUser"],
  token: string
) {
  await show(token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else setUser(data);
  });
}

export async function userUpdate(
  user: User,
  token: string,
  setErrors: UserFunctions["setErrors"],
  setMessage: UserFunctions["setMessage"]
) {
  const { name, email } = user;
  await update(name, email, token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else if (isErrors(data)) setErrors(data.errors);
    else setMessage(data.message);
  });
}

export async function userUpdateAvatar(
  user: User,
  setErrors: UserFunctions["setErrors"],
  setMessage: UserFunctions["setMessage"],
  token: string
) {
  const { file } = user;
  await updateAvatar(file, token).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else if (isErrors(data)) setErrors(data.errors);
    else setMessage(data.message);
  });
}

export async function userUpdatePassword(
  user: User,
  setErrors: UserFunctions["setErrors"],
  setMessage: UserFunctions["setMessage"],
  token: string
) {
  const {old_password, password, password_confirmation} = user
  await updatePassword(
    old_password,
    password,
    password_confirmation,
    token
  ).then((data) => {
    if (isUnauthenticated(data)) redirect("/");
    else if (isErrors(data)) setErrors(data.errors);
    else setMessage(data.message);
  });
}

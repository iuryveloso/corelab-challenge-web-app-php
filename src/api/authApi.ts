import {
  Errors,
  Message,
  Token,
  Unauthenticated,
} from "@/interfaces/authInterfaces";

const domain = () => process.env.NEXT_PUBLIC_API_DOMAIN as string;

export async function login(
  email: string,
  password: string
): Promise<Token | Errors> {
  return await fetch(`${domain()}/api/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then((e) => e.json());
}

export async function register(
  name: string,
  email: string,
  file: File,
  password: string,
  password_confirmation: string
): Promise<Token | Errors> {
  return await fetch(`${domain()}/api/register`, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      file,
      password,
      password_confirmation,
    }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    credentials: "include",
  }).then((e) => e.json());
}

export async function logout(
  token: string
): Promise<Unauthenticated | Message> {
  return await fetch(`${domain()}/api/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json());
}

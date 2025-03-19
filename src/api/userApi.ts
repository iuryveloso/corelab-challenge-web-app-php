import {
  User,
  Errors,
  Message,
  Unauthenticated,
} from '@/interfaces/userInterfaces'

const domain = () => process.env.NEXT_PUBLIC_API_DOMAIN as string

export async function show(token: string): Promise<Unauthenticated | User> {
  return await fetch(`${domain()}/api/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json())
}

export async function update(
  name: string,
  email: string,
  token: string
): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain()}/api/user/update`, {
    method: 'PATCH',
    body: JSON.stringify({ name, email }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((e) => e.json())
}

export async function updateAvatar(
  file: File,
  token: string
): Promise<Unauthenticated | Message | Errors> {
  const userFormData = new FormData()
  userFormData.append('file', file)
  return await fetch(`${domain()}/api/user/update/avatar`, {
    method: 'POST',
    body: userFormData,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json())
}

export async function updatePassword(
  old_password: string,
  password: string,
  password_confirmation: string,
  token: string
): Promise<Unauthenticated | Message | Errors> {
  return await fetch(`${domain()}/api/user/update/password`, {
    method: 'PATCH',
    body: JSON.stringify({ old_password, password, password_confirmation }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((e) => e.json())
}

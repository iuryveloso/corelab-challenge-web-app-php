import { Message } from '@/interfaces/authInterfaces'

const domain = () => process.env.NEXT_PUBLIC_APP_DOMAIN as string

export async function getTokenFromCookies(): Promise<{
  token: string | undefined
}> {
  return await fetch(`${domain()}/api/get-token`, {
    method: 'GET',
    credentials: 'include',
  }).then((e) => e.json())
}

export async function setTokenOnCookies(
  token: string
): Promise<Message> {
  return await fetch(`${domain()}/api/set-token`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ token }),
  }).then((e) => e.json())
}

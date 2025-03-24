import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const cookieStore = await cookies()

  // if (!body.token) return Response.json({ errors: {token: 'Houve um erro. Tente novamente mais tarde.'} })
  if (!body.token) {
    cookieStore.delete('token')
    return Response.json({ message: 'Voce saiu do sistema.' })
  }
  const age = 60*60*24*7
  cookieStore.set('token', body.token, {maxAge: age, httpOnly: true})
  return Response.json({ message: 'Login concluido.' })
}

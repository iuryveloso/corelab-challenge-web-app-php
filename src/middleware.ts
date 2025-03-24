import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  const includesLogin = request.nextUrl.pathname.startsWith('/login')
  const includesRoot = request.nextUrl.pathname === '/'

  const includesProfile = request.nextUrl.pathname.startsWith('/profile')
  const includesDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if ((includesLogin || includesRoot) && token?.value) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if ((includesProfile || includesDashboard || includesRoot) && !token?.value) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies()

    const cookie = cookieStore.get('token')

    if(!cookie?.value) return Response.json({token: undefined})

    return Response.json({token: cookie?.value})
}
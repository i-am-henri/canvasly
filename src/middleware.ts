import type { Session } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {  NextResponse } from "next/server";
import { lucia } from "./auth/lucia";
export const runtime = "nodejs"
export async function middleware() {
    console.log("middleware")
    const sessionCookie = cookies().get("Set-Cookie")?.value
    let session: Session | null = null
    if (sessionCookie) {
        const sessionId = lucia.readSessionCookie(sessionCookie);

        const data = await lucia.validateSession(sessionId || "");
        session = data.session
    }
    if (!session) {
        redirect("/login")
    }
    return NextResponse.next()
}
export const config = {
    matcher: [
        '/dashboard/:path*',
        "/dashboard"
    ]
}
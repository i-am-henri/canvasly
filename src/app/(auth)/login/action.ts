"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { lucia } from "~/auth/lucia"
import { db } from "~/server/db"
import bcrypt from "bcrypt"

const formDataSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(24)
})

export async function login(prevState: unknown, e: FormData): Promise<{
    message?: string,
    error?: string
}> {
    
    const email = e.get("email") as string
    const password = e.get("password") as string
    const username = e.get("username") as string

    const parse = formDataSchema.safeParse({
        email,
        password,
        username
    })
    if (!parse.success) {
        return {
            message: undefined,
            error: "Validation error. Check your email or your password."
        }
    }
    // checks if the user exists in the db
    const user = await db.user.findUnique({
        where: {
            email,
        },
    })
    if (!user) return {
        message: undefined,
        error: "User not found."
    }
    if (!user.emailVerified) {
        return {
            message: undefined,
            error: "Email not verified. Please verify your email first, we send you a verification link."
        }
    }
    const compare = await bcrypt.compare(password, user.password)
    // all checks done, now the authentication logic
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set("Set-Cookie", sessionCookie.serialize())

    redirect("/dashboard")
}
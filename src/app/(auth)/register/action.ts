"use server"
import { redirect } from "next/navigation"
import { z } from "zod"
import { db } from "~/server/db"
import bcrypt from "bcrypt"
import { resend } from "~/lib/resend"
import verify from "~/emails/verify"
const formDataSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(24),
    repassword: z.string().min(8).max(24)
})
export async function register(prevState: unknown, e: FormData): Promise<{
    message?: string,
    error?: string
}> {

    const email = e.get("email") as string
    const password = e.get("password") as string
    const repassword = e.get("password") as string
    const username = e.get("username") as string

    const parse = formDataSchema.safeParse({
        email,
        password,
        repassword
    })

    if (!parse.success) {
        return {
            message: undefined,
            error: "Validation error. Check your email or your password."
        }
    }

    if (password !== repassword) {
        return {
            message: undefined,
            error: "Passwords not matching."
        }
    }

    // checks if the user is already with this email or username registered
    const user = await db.user.findFirst({
        where: {
            OR: [
                {
                    email
                },
                {
                    username
                }
            ]
        },
    })

    if (user) {
        return {
            message: undefined,
            error: "User already registered with this email or username."
        }
    }

    const hash = await bcrypt.hash(password, 10).catch((err) => {
        if (err) throw new Error(err.message)
    })

    const hashSchema = z.string()

    const hashParse = await hashSchema.safeParseAsync(hash)
    if (!hashParse.success) {
        return {
            error: "Error at creating the user.",
            message: undefined
        }
    }

    // create the user with the hash in the db
    await db.user.create({
        data: {
            email,
            username,
            emailVerified: null,
            password: hashParse.data
        }
    })
    const now = new Date();
    const two = new Date(now.setDate(now.getDate() + 2)).toISOString()

    const verification = await db.verificationToken.create({
        data: {
            expires: two.toString(),
            mail: email,
            token: crypto.randomUUID()
        }
    })

    const token = btoa(`${verification.expires} ${verification.mail} ${verification.token}`)

    const { data, error } = await resend.emails.send({
        from: 'Booster <booster@henri.gg>',
        to: [email],
        subject: 'Booster | verify your email',
        react: verify({ code: token }),
    });

    console.log("Send the email: ", data)
    if (error) throw new Error(error.message)

    return {
        message: "We sent you an email to verify your account.",
        error: undefined
    }
}
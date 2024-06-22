"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { lucia } from "~/auth/lucia"
import { db } from "~/server/db"
import bcrypt from "bcrypt"

const formDataSchema = z.object({
    name: z.string().min(3),
    description: z.string().email(),
})

export async function login(prevState: unknown, e: FormData): Promise<{
    message?: string,
    error?: string
}> {
    const name = e.get("name") as string
    const description = e.get("description") as string

    const parse = formDataSchema.safeParse({
        name, 
        description
    })

    if (!parse.success) {
        return {
            error: "Validation of the given inputs went wrong.",
            message: undefined
        }
    }

    

}
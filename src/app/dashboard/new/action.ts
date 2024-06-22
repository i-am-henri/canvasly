"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { lucia } from "~/auth/lucia"
import { db } from "~/server/db"
import bcrypt from "bcrypt"
import { checkRequest } from "~/lib/checkRequest"

const formDataSchema = z.object({
    name: z.string().min(3),
    description: z.string().max(350).optional(),
    icon: z.string().optional()
})

export async function createTeam(prevState: unknown, e: FormData): Promise<{
    message?: string,
    error?: string
}> {
    
    const name = e.get("name") as string
    const description = e.get("description") as string
    const icon = e.get("icon") as string

    const {userId} =  await checkRequest()
    const parse = formDataSchema.safeParse({
        name, 
        description,
        icon
    })
    if (!parse.success) {
        return {
            message: undefined,
            error: "Validation error. Check your name and the characters of your description."
        }
    }
    const team = await db.team.create({
        data: {
            name,
            description,
            creatorId: userId,
        }

    })
    redirect(`/dashboard/${team.id}`)
}
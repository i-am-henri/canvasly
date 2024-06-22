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
    description: z.string(),
})

export async function createPresentation(prevState: unknown, e: FormData): Promise<{
    message?: string,
    error?: string
}> {
    const name = e.get("name") as string
    const description = e.get("description") as string
    const teamId = e.get("team") as string

    const session = await checkRequest()

    const user = await db.user.findUnique({
        where: {
            id: session.userId
        }
    })
    // fetching the team
    const team = await db.team.findUnique({
        where: {
            id: teamId
        }
    })
    const teamMember = await db.teamMember.findUnique({
        where: {
            teamId,
            userId: user?.id,
            // only admins can create presentations
            role: "ADMIN"
        }
    })
    // TODO: handle error when no team is defined
    if (!team) redirect("/dashboard")
    if (!user) {
        cookies().delete("")
        redirect("/login")
    }
    if (!teamMember) {
        // user has no access
        return {
            error: "Could not find the team, or you don't have access to create a new presentation.",
            message: undefined
        }
    }

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
    const presentation = await db.presentation.create({
        data: {
            name,
            description,
            teamId
        }
    })

    redirect("/dashboard/")

}
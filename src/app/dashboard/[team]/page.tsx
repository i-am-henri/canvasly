import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { checkRequest } from "~/lib/checkRequest"
import { db } from "~/server/db"

/*
 * Page with all of the Presentations a team has, the documents and assets. This is like a homepage for the dashboard.
 */
export default async function TeamSpace({
    params
}: {
    params: {
        // The teamspace id
        team: string
    }
}) {
    console.log("reading...")
    const session = await checkRequest()

    const user = await db.user.findUnique({
        where: {
            id: session.userId
        }
    })

    

    // fetching the team
    const team = await db.team.findUnique({
        where: {
            id: params.team
        }
    })
    const teamMember = await db.teamMember.findUnique({
        where: {
            userId: session.userId,
            teamId: team?.id
        }
    })
    if (!teamMember) {
        console.log("no access")
        // user has no access
        redirect("/dashboard")
    }



    // TODO: handle error when no team is defined
    if (!team) redirect("/dashboard")
    if (!user) {
        cookies().delete("")
        redirect("/login")
    }
    return (
        <div>
            <h2>Welcome back, {user.username}</h2>
        </div>
    )
}
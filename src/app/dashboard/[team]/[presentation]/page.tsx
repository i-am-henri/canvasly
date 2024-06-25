import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Editor from "~/components/editor/editor"
import { checkRequest } from "~/lib/checkRequest"
import { db } from "~/server/db"

export default async function Presentation({
    params
}: {
    params: {
        presentation: string,
        team: string
    }
}) {
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
    // TODO: handle error when no team is defined
    if (!team) redirect("/dashboard")
    if (!user) {
        cookies().delete("")
        redirect("/login")
    }
    if (!teamMember) {
        // user has no access
        redirect("/dashboard")
    }
    // fetchs the presentation data
    const presentation = await db.presentation.findUnique({
        where: {
            id: params.presentation,
            teamId: team?.id
        }
    })

    if (!presentation) redirect(`/dashboard/${team.id}`)
    return (
        <div>
            <Editor slides={presentation.slides} teamId={team.id} />
            {presentation?.name}
        </div>
    )
}
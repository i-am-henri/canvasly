import { redirect } from "next/navigation"
import {db} from "~/server/db"
export default async function TeamSpace({
    params
}: {
    params: {
        // The teamspace id
        team: string
    }
}) {
    const team = await db.team.findUnique({
        where: {
            id: params.team
        }
    })
    // TODO: handle error when no team is defined
    if (!team) redirect("")

    return (
        <div>
            {team.name}
        </div>
    )
}
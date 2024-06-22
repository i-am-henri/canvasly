import { redirect } from "next/navigation"
import {db} from "~/server/db"

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
    // fetching the team
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
import { redirect } from "next/navigation";
import Editor from "~/components/editor/editor";
import { checkRequest } from "~/lib/checkRequest";
import { db } from "~/server/db";

export default async function Dashboard() {
    const user = await checkRequest()
    const teams = await db.teamMember.findMany({
        where: {
            userId: user.userId
        }
    })
    // The user don't have any teams, the user will be redirected to a specific page to create a new team
    if (!teams || teams.length === 0) {
        redirect("/dashboard/new")
    }
    return (
        <div>
            {
                teams && (
                    <div>
                        {teams.map((team) => (
                            <p key={team.teamId}>{team.teamId}</p>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
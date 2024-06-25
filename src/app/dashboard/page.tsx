import type { $Enums } from "@prisma/client";
import Link from "next/link";
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
    // array for the teams
    const DashboardTeams:{
        id: string;
        name: string;
        description: string | null;
        creatorId: string;
    }[]  = []
    // fetch the teams where you in
    for await (const dashboardTeam of teams) {
        const data = await db.team.findUnique({
            where: {
                id: dashboardTeam.teamId
            }
        })
        if (data) {
            DashboardTeams.push(data)
        }
    }


    return (
        <div>
            <h2>You teams</h2>
            {teams? DashboardTeams.map((team) => (
                <Link className="border p-2 rounded-md bg-[#DBDBDB]" href={`/dashboard/${team.id}`} key={team.id}>
                    {team.name}
                </Link>
            )): <div>
                Can't find any teams
                </div>}
        </div>
    )
}
import type { $Enums } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import TeamCard from "~/components/dashboard/team-card";
import Editor from "~/components/editor/editor";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { checkRequest } from "~/lib/checkRequest";
import { db } from "~/server/db";


// Page for the user, where he can select his team
export default async function Dashboard() {
    // get the user
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
    const DashboardTeams: {
        id: string;
        name: string;
        description: string | null;
        creatorId: string;
    }[] = []
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
    const dbUser = await db.user.findUnique({
        where: {
            id: user.id
        },
        select: {
            username: true
        }
    })


    return (
        <div className="w-[calc(100vw-240px)]">
            <h2 className="mx-2 mt-2 text-2xl font-medium">
                Welcome back{dbUser?.username? ` , ${dbUser.username}`: ""}!
            </h2>
            <div className="flex justify-between mt-2 mx-2">
                <h2 className="mb-2 text-xl font-medium">You teams: </h2>
                <div>
                    <Tooltip>
                        <TooltipTrigger> 
                            <Plus className="p-[2px] rounded-full border-b border-b-[#f9f9f9f9] bg-[#f5f5f5]" />
                        </TooltipTrigger>
                        <TooltipContent>
                            create a new team
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <div className="flex overflow-x-scroll mt-1 mx-2 py-1 px-1">
            {teams ? DashboardTeams.map((team) => (
                <TeamCard description={team.description} id={team.id} name={team.name} key={team.name} />
            )) : <div className="w-full">
                Can't find any teams
            </div>}
            </div>
        </div>
    )
}
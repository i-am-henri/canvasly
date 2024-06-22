import { Plus } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"
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

    const presentations = await db.presentation.findMany({
        where: {
            teamId: team.id
        }
    })



    
    return (
        <div>
            <h2 className="text-xl font-medium">Welcome back, {user.username} {teamMember.role === "USER"? "to the team": "to your team"} {team.name}.</h2>
            <div>
                <div className="flex">
                    
                <h2 className="text-lg font-medium">The presentations</h2>
                <Link href={`/dashboard/${params.team}/new-presentation?team=${team.name}`}>
                
                <Plus size={20}/>
                </Link>
                </div>
                {presentations.map((slide) => (
                    <div key={slide.id}>
                        {slide.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
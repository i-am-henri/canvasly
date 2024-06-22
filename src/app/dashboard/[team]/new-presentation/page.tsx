import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewPresentationForm from "~/components/dashboard/new-presentation-form";
import { checkRequest } from "~/lib/checkRequest";
import { db } from "~/server/db";

export default async function NewPresentation({
    params,
    searchParams,
}: {
    params: { team: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const teamName = searchParams?.team

    // checking if the team exists and the member has the rights to create a new presentation
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
    return (
        <div className="min-h-screen flex items-center justify-center w-[calc(100vw-240px)]">
            <NewPresentationForm teamId={team.id} name={team.name} />
        </div>
    )

}
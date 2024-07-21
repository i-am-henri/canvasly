import NewForm from "~/components/dashboard/new-form"
import Header from "~/components/elements/header"
import { checkRequest } from "~/lib/checkRequest"
import { db } from "~/server/db"

// The page to create a new team
export default async function New() {
    const user = await checkRequest()
    const teams = await db.teamMember.findMany({
        where: {
            userId: user.userId
        }
    })

    // user can create a maximum of three teams (with the free plan and by now)
    if (teams.length >= 3) {
        return (
            <div className="min-h-screen items-center justify-center flex">
                <h2 className="text-red-900">You already own three teams. You cannot create more.</h2>
            </div>
        )
    }
    return (
        <div className="min-h-screen flex items-center justify-center w-[calc(100vw-240px)]">
            <NewForm />
        </div>
    )
}
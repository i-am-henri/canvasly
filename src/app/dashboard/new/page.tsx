import Header from "~/components/elements/header"
import { checkRequest } from "~/lib/checkRequest"
import { db } from "~/server/db"

// A page to create a new team
export default async function New() {
    const user = await checkRequest()
    const teams = await db.teamMember.findMany({
        where: {
            userId: user.userId
        }
    })
    // user can create a maximum of three teams
    if (teams.length >= 3) {
        return (
            <div className="min-h-screen items-center justify-center flex">
                <div className="absolute top-0">
                    <Header />
                </div>
                <h2 className="text-red-900">You already own three teams. You cannot create more.</h2>
            </div>
        )
    }
    return (
        <div>

        </div>
    )
}
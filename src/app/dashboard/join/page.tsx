import { redirect } from "next/navigation";
import { z } from "zod";
import { checkRequest } from "~/lib/checkRequest";
import { db } from "~/server/db";

// Join a team with a unique access code
export default async function Join({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    /**The unique token */
    const token = searchParams?.token as string

    // checks if token is defined
    if (!token) redirect("/dashboard")
    const session = await checkRequest()

    /*
     * The following part is working like the email confirmation.
     * You will get a token, which is a mix from a unique token, the email from the user, and a timestamp.
     * This will be compared to the data of the database.
     * 
     * The content:
     * 1. the email of the user [1]
     * 2. the token [2]
     * 3. the timestamp [3]
     * 
     * The user will then added to the team as a member, the owner of the team can choose, if he will be a creator (He can delete presentations,
     * remove users & can create new presentations) or a user (normal user, can't create or delete presentations, but edit them). But the user
     * can't be an admin for now.
     * 
     * TODO: implement a function to deliver the admin role to a creator or user
     */

    // decode the token and split it
    const decodedString: string[] = atob(token).split(" ")

    // the content of the token
    const email: string | undefined = decodedString[0]
    const uniqueToken: string | undefined = decodedString[1]
    const timestamp: string | undefined = decodedString[2]

    // parse the token
    const tokenSchema = await z.object({
        email: z.string().email(),
        // token should be 24 characters long
        uniqueToken: z.string().min(24),
        timestamp: z.string()
    }).safeParseAsync({
        email,
        uniqueToken,
        timestamp
    })

    // parsing not successfull
    if (!tokenSchema.success) {
        redirect("/login?verifyError=You was invited to a team, but the token was incorrect. Please ask for another token or contact us.")
    }

    // checking if the email is corresponding to the user
    const user = await db.user.findUnique({
        where: {
            email
        }
    })
    // user not found, redirect to the login
    if (!user) {
        redirect("/login?verifyError=This link was for an other user.")
    }
    // the email is not verified
    if (!user.emailVerified) {
        redirect("/login?verifyError=Your account is not yet verified. Please verify your account first, then you can come back.")
    }

    // get the token from the db
    const inviteToken = await db.teamInvite.findUnique({
        where: {
            mail: tokenSchema.data.email,
            token: tokenSchema.data.uniqueToken,
        }
    })
    if (!inviteToken) {
        redirect("/login?verifyError=We can't find you invite code. Please ask for another one.")
    }

    // get the teammember
    const teamMember = await db.teamMember.findUnique({
        where: {
            userId: user.id
        }
    })

    // user is already in this team
    if (teamMember) {
        redirect("/dashboard")
    }







    return (
        <div>
        </div>
    )
}
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
     */

    // decode the token and split it
    const decodedString: string[] = atob(token).split(" ")

    // the content of the token
    const email: string | undefined = decodedString[0]
    const uniqueToken: string | undefined = decodedString[1]
    const timestamp: string | undefined = decodedString[2]

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

    if (!tokenSchema.success) {
        redirect("/login?verifyError=You was invited to a team, but the token was incorrect. Please ask for another token or contact us.")
    }





    

    return (
        <div>
        </div>
    )
}
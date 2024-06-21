import { notFound, redirect } from "next/navigation";
import type { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(req: NextRequest, res: NextResponse) {
    /*
    *   Error handling:
    *   1 option: throw an error, the user will be redirected to an page where the error is described (not the best option)
    *   2 option: redirect the user to the login page, with the "verifyError"-search-param (better, because we have a custom ui and the user can try is another time)
    */

    const pathname = req.nextUrl.searchParams

    const token = pathname.get("code")
    if (!token) notFound()

    /*
    *   Expect the parsed token to be:
    *   1. the timestamp, for the time period of the validity [0]
    *   2. the mail of the user [1]
    *   3. the unique token for indentifing in the db [2]
    */

    const parsedToken: string[] = atob(token).split(" ")

    if (parsedToken.length !== 3 || parsedToken === undefined || null) redirect("/login?verifyError=Your code was modified and can't be found.")

    // checking if the provided token isn't modified
    const dbToken = await db.verificationToken.findUnique({
        where: {
            expires: parsedToken[0],
            mail: parsedToken[1],
            token: parsedToken[2],
        }
    })

    if (!dbToken) redirect("/login?verifyError=Your code was modified and can't be found.")


    const date = parsedToken[0]

    if (!date) {
        redirect("/login?verifyError=Your code was modified and can't be found.")
    }

    const currentDate = new Date().toISOString()

    // Check if the date is in the past
    if (date < currentDate) {
        redirect("/login?verifyError=Your token is sadly already over, please contact us, wen can send you a new one.")
    }

    console.log(date)
    console.log(parsedToken)

    // Success: the user is verified, the token will be deleted and the user will get a verification entry
    const deleteToken = await db.verificationToken.delete({
        where: {
            expires: parsedToken[0],
            mail: parsedToken[1],
            token: parsedToken[2],
        }
    })

    // update the user with the new field
    const user = await db.user.update({
        where: {
            email: parsedToken[1]
        },
        data: {
            emailVerified: new Date().toISOString()
        }
    })

    // the user is successfully verified, now redirecting to the login page with the "verify"-search-param for showing a custom message, which tells the user to log in
    redirect("/login?verify=true")
}
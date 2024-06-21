import type { Session } from "lucia";
import { cookies } from "next/headers";
import Link from "next/link";
import { lucia } from "~/auth/lucia";
import RegisterForm from "~/components/auth/register-form";
import Header from "~/components/elements/header";

export default async function Register({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const sessionCookie = cookies().get("Set-Cookie")?.value
    let session: Session | null = null
    if (sessionCookie) {
        const sessionId = lucia.readSessionCookie(sessionCookie);
        const data = await lucia.validateSession(sessionId || "");
        session = data.session
    }
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <div className="absolute top-0">
                <Header />
            </div>
            {
                session && (
                    <div className="border-b border-b-[#DBDBDB] ring-1 px-4 rounded-md py-2 mb-5 ring-[#DBDBDB]">
                        You are already logged in! <Link href="/dashboard" className="underline">Go here to the dashboard</Link>.
                    </div>
                )
            }
            <RegisterForm />
        </div>
    )
}
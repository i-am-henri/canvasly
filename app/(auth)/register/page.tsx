import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Register() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    if (user.data) {
        redirect("/dashboard")
    }
    //TODO: username mit einfügen
    async function register(e: FormData) {
        "use server"
        const email = e.get("email") as string
        const password = e.get("password") as string
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            throw new Error(error.message)
        }
        redirect("/dashboard")
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
            <form action={register} className="flex items-center justify-center flex-col">
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="username" type="text" name="username" />
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="email" type="email" name="email" />
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="password" type="password" name="password" />
                <Button type="submit">Register</Button>
            </form>
        </div>
    )
}
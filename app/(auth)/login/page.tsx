import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/config/supabase";
import { redirect } from "next/navigation";

export default async function Login() {
    const user = await supabase.auth.getUser()
    if (user.data) {
        redirect("/dashboard")
    }
    async function login(e: FormData) {
        "use server"
        const email = e.get("email") as string
        const password = e.get("password") as string
        const { data, error } = await supabase.auth.signInWithPassword({
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
            <form action={login} className="flex items-center justify-center flex-col">
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0]" placeholder="email" type="email" name="email" />
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0]" placeholder="password" type="password" name="password" />
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}
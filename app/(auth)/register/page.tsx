import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Register() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    if (user.data) {
        redirect("/dashboard")
    }
    //TODO: username mit einfügen
    const signUp = async (formData: FormData) => {
        "use server";
    
        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();
    
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
          },
        });
    
        if (error) {
          return redirect("/login?message=Could not authenticate user");
        }
    
        return redirect("/login?message=Check email to continue sign in process");
      };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
            <form action={signUp} className="flex items-center justify-center flex-col">
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="username" type="text" name="username" />
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="email" type="email" name="email" />
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="password" type="password" name="password" />
                <SubmitButton type="submit">register</SubmitButton>
            </form>
        </div>
    )
}
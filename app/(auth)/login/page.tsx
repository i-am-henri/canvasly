import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/dashboard");
    };



    return (
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
            <form action={signIn} className="flex items-center justify-center flex-col">
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="email" type="email" name="email" />
                <Input className="w-min mb-2 border-[#808080] dark:border-[#ffffffc0] " placeholder="password" type="password" name="password" />
                <SubmitButton type="submit">login</SubmitButton>
            </form>
        </div>
    )
}

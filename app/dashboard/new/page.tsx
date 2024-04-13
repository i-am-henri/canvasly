import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function NewPresentation() {
    async function submit(e: FormData) {
        "use server"
        const supabase = createClient()

        const title = e.get("title") as string
        const description = e.get("description") as string | undefined

        if (!title) {
            throw new Error("The title is not defined")
        }
        const user = await supabase.auth.getUser()
        if (!user.data.user?.id) {
            throw new Error("Id of the user is not defined, please try to login.")
        }
        const {data, error} = await supabase.from("presentation").insert({
            owner: user.data.user.id,
            title,
            description,
            deleted: false,
        })
        console.log(data)
        if (error || !data) throw new Error(error?.message || "We had an error while creating the new presentation.")
        redirect("/dashboard/presentation/" + data)
    }
    return (
        <form action={submit} className="min-h-screen flex w-full items-center justify-center flex-col ">
            <Input required placeholder="title" name="title" />
            <Textarea placeholder="description" name="description" />
            <Button type="submit">
                create
            </Button>
        </form>
    )
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";

export default function NewPresentation() {
    async function submit(e: FormData) {
        "use server"

        const title = e.get("title") as string
        const description = e.get("description") as string | undefined

        if (!title) {
            throw new Error("The title is not defined")
        }

        redirect("/")
    }
    return (
        <form action={submit} className="min-h-screen flex w-full items-center justify-center flex-col ">
            <Input placeholder="title" name="title" />
            <Textarea placeholder="description" name="description" />
            <Button type="submit">
                create
            </Button>
        </form>
    )
}
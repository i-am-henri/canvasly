import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Feedback() {
    async function submit(e: FormData) {
        "use server"
    }
    return (
        <form action={submit} className="min-h-screen flex flex-col items-center justify-center w-full">
            <Textarea placeholder="your message" name="message" />
            <p className="text-[#808080]">We use your email and name which you provide at the signup. </p>
            <Button type="submit">submit</Button>
        </form>
    )
}
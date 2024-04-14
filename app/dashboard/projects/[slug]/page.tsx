import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pen, Settings, Text, Trash } from "lucide-react"
import Link from "next/link"
import Editor from "@/components/Editor"

export default async function PresentationEditor({ params }: { params: { slug: string } }) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('presentation')
        .select("*")
        .eq("id", params.slug)
        .single()

    if (!data) notFound()
    if (error) throw new Error(error.message)
    console.log(data, error)
    return (
        <div className="min-h-screen flex flex-col w-full">
            <div className="flex items-center justify-between">
                <div className="flex flex-col ml-5">
                    <h2 className="text-2xl">{data?.title}</h2>
                    <p>{data?.description}</p>
                </div>
                <div className="flex">
                    <Link href={`/dashboard/projects/${data?.id}/settings`} className="mr-5 flex"><Settings className="mr-2" />settings</Link>
                    <Link href={`/dashboard/projects/${data?.id}/documents`} className="mr-5 flex"><Text className="mr-2" />documents</Link>
                    <AlertDialog>
                        <AlertDialogTrigger className="flex mr-5"><Trash color="#eb4034" className="mr-2"/>delete</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete this presentation?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your presentation
                                    and remove your presentation-data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <hr />
            {/* The editor */}
            <div className="w-full h-full">
                <Editor />
            </div>
        </div>
    )
}
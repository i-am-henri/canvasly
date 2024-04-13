import { createClient } from "@/utils/supabase/server"
import { ErrorHandlerSource } from "next/dist/server/app-render/create-error-handler";

export default async function PresentationSidebar() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const id = user?.data.user?.id

    const { data, error } = await supabase
        .from('presentation')
        // select 3 presentations of this owner
        .select('*').eq("owner", id).range(0, 2)
        console.log(data)
    console.log(data)
    console.log(error)
    return (
        <div>
            {
                data?.map((presentation) => {
                    return (
                        <div key={presentation.id}>
                            <h1>{presentation.title}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}
import { createClient } from "@/utils/supabase/server"
import { ErrorHandlerSource } from "next/dist/server/app-render/create-error-handler";

export default async function PresentationSidebar() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const id = user?.data.user?.id

    const { data, error } = await supabase
        .from('presentation')
        .select('*')
        .eq('owner', "henri");
    console.log(data)
    console.log(error)
    return (
        <div>
            {
                data?.map((presentation) => {
                    return (
                        <div>
                            <h1>{presentation.title}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}
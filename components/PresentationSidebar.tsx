import { createClient } from "@/utils/supabase/server"

export default async function PresentationSidebar() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const id = user?.data.user?.id

    const { data, error } = await supabase
        .from('presentation')
        .select('*')
        .eq('owner_id', "henri");
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
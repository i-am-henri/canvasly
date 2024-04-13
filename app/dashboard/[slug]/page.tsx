import { createClient } from "@/utils/supabase/server"

export default async function PresentationEditor({ params }: { params: { slug: string } }) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('presentation')
        .select("*")
        .eq("id", params.slug)

    console.log(data, error)
    return (
        <div>
            {JSON.stringify(data || error)}
        </div>
    )
}
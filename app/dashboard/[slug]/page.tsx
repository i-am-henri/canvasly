import { createClient } from "@/utils/supabase/server"

export default async function PresentationEditor({params}: {params: {slug: string}}) {
    const supabase = createClient()
    const { data, error } = await supabase.from('presentation').select("*").eq('id', "0bace0b2-710b-48e9-b704-22e84d39fafe").single()
    return (
        <div>
            {params.slug}
            {data?.title}
        </div>
    )
}
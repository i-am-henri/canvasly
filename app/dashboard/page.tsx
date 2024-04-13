import { createClient } from "@/utils/supabase/server"

export default async function Dashboard() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()

    return (
        <div className="flex flex-col h-screen m-2" style={{height: "300vh"}}>
            <h2 className="text-2xl">Welcome back 👋</h2>
        </div>
    )
}
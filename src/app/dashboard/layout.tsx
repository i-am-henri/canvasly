import Sidebar from "~/components/elements/sidebar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex">
            <div className="min-h-screen overflow-auto">
                <Sidebar />
            </div>
            <div className="ml-[200px]">
                {children}
            </div>
        </div>
    )
}
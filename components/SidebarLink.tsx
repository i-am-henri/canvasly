import Link from "next/link";

interface Props extends React.HTMLProps<HTMLAnchorElement> {
    icon: React.ReactNode;
    title: string;
    link: string
}

export default function SidebarLink({ icon, title, link,...props }: Props) {
    return (
        <Link href={link} {...props}>
            <div className="flex items-center justify-between px-2 py-1 text-sm font-medium text-[#e1e1e1] rounded-md hover:bg-gray-100 dark:hover:bg-[#191a1c]  transition duration-300">
                <div className="flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                </div>
            </div>
        </Link>
    )
}
import { cn } from "~/lib/utils"
import Badge from "./badge"

interface AnnonceProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    badge?: string

}

export default function Annonce({
    children,
    /**Text for the badge */
    badge = "new",
    ...props
}: AnnonceProps) {
    return (
        <div {...props} className={cn("rounded-full flex items-center justify-center border pl-1 pr-2 py-1", props.className)}>
            <Badge className="mr-2" variant={"primary"} size={"small"}>
                {badge}
            </Badge>
            {children}
        </div>
    )
}
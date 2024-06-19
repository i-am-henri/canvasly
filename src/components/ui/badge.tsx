import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const BadgeStyles = cva("badge", {
    variants: {
        variant: {
            primary: [
                "bg-[#2d76fb]",
                "text-white",
                "border-transparent",
                "hover:bg-blue-600",
                "transition",
                "rounded-full",
            ],
            secondary: [
                "bg-neutral-600",
                "rounded-full",
                "text-white",
                "border-neutral-600",
                "hover:bg-neutral-800",
                "transition"
            ],
        },
        size: {
            small: ["text-sm", "py-1", "px-2"],
            medium: ["text-base", "py-1", "px-4"],
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "medium",
    },
});
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof BadgeStyles> {
    children: React.ReactNode,
}
export default function Badge({
    children,
    size,
    variant,
    ...props
}: BadgeProps) {
    return (
        <div  {...props} className={cn("border", BadgeStyles({ size, variant }), props.className)}>
            {children}
        </div>
    )
}
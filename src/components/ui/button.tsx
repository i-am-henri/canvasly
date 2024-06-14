import { cn } from "~/lib/utils"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  /**Primary is the standart blue button, secondary the grey, danger is red and success is green */
  variant: "primary" | "secondary" | "danger" | "success"
}

export default function Button({variant, children, ...props}: ButtonProps) {
  return (
    <button {...props} className={cn("bg-gradient-to-t hover:bg-gradient-to-t hover:from-[#2d78df] hover:to-[#2d76ff] to-[#2d73ff] from-[#3776f5] rounded-[8px]  border-[2px] border-[#2b65d8] text-white px-2", props.className)}>
      {children}
    </button>
  )
}
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-[#6149E9] to-[#7c5ef0] text-white hover:shadow-lg hover:shadow-[#6149E9]/50",
        secondary: "bg-[#A09BD3] text-white hover:bg-[#8a84c7] hover:shadow-lg",
        outline: "border-2 border-[#6149E9] text-[#6149E9] hover:bg-[#6149E9]/10",
        ghost: "hover:bg-[#1B1C31]/80 text-white",
        danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/50",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-3 text-base",
        lg: "px-6 py-4 text-lg",
        icon: "p-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
))
Button.displayName = "Button"

export default Button
export { buttonVariants }
import React from "react"
import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, label, error, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-lg font-medium mb-3 text-[#A09BD3]">{label}</label>}
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-lg border border-[#A09BD3] bg-[#1B1C31] text-white placeholder:text-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] focus:border-transparent transition-colors text-lg",
        error && "border-red-500",
        className,
      )}
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
))
Input.displayName = "Input"

export default Input
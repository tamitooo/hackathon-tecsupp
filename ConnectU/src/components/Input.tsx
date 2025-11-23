import React from "react"
import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, label, error, ...props }, ref) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium mb-2 text-[#A09BD3]">{label}</label>}
    <input
      ref={ref}
      className={cn(
        "w-full px-5 py-4 rounded-xl border-2 bg-[#0f0f1e] text-white placeholder:text-[#A09BD3]/60 focus:outline-none transition-all duration-300 text-base transform hover:scale-[1.01]",
        error 
          ? "border-red-500 focus:border-red-500 animate-shake" 
          : "border-[#A09BD3]/30 focus:border-[#6149E9] focus:shadow-lg focus:shadow-[#6149E9]/30",
        className,
      )}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm mt-2 px-2 flex items-center gap-1 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {error}
      </p>
    )}
  </div>
))
Input.displayName = "Input"

export default Input
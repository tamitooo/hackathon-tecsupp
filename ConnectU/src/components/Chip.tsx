import React from "react"
import { X } from "lucide-react"
import { cn } from "../lib/utils"

interface ChipProps {
  label: string
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  size?: "sm" | "md" | "lg"
  removable?: boolean
  onRemove?: () => void
  icon?: React.ReactNode
  className?: string
}

export default function Chip({
  label,
  variant = "primary",
  size = "md",
  removable = false,
  onRemove,
  icon,
  className,
}: ChipProps) {
  const variants = {
    primary: "bg-[#6149E9]/20 text-[#6149E9] border-[#6149E9]/30",
    secondary: "bg-[#A09BD3]/20 text-[#A09BD3] border-[#A09BD3]/30",
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    danger: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  }

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 hover:opacity-70 transition-opacity ml-1"
          aria-label="Remove"
        >
          <X size={size === "sm" ? 12 : size === "md" ? 14 : 16} />
        </button>
      )}
    </div>
  )
}

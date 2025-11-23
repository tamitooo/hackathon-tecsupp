import type { LucideIcon } from "lucide-react"
import Button from "./Button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      {/* Icon with animated gradient background */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full blur-xl opacity-30 animate-pulse" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full flex items-center justify-center">
          <Icon size={40} className="text-white" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#A09BD3] text-base max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="lg"
          className="min-w-[200px]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

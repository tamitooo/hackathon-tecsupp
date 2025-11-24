import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  variant?: "card" | "text" | "avatar" | "swipeCard" | "profile"
  className?: string
}

export default function LoadingSkeleton({ variant = "card", className }: LoadingSkeletonProps) {
  if (variant === "swipeCard") {
    return (
      <div className={cn("bg-[#2A2B45] rounded-2xl shadow-xl overflow-hidden border border-[#A09BD3]/20 max-w-md w-full mx-auto animate-pulse", className)}>
        {/* Header */}
        <div className="h-48 bg-gradient-to-br from-[#6149E9]/30 to-[#A09BD3]/30" />
        
        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-[#A09BD3]/20 rounded w-1/3" />
            <div className="h-4 bg-[#A09BD3]/20 rounded w-1/4" />
          </div>
          <div className="h-3 bg-[#A09BD3]/20 rounded w-1/2" />
          <div className="space-y-2">
            <div className="h-3 bg-[#A09BD3]/20 rounded w-full" />
            <div className="h-3 bg-[#A09BD3]/20 rounded w-4/5" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 bg-[#A09BD3]/20 rounded-full w-20" />
            <div className="h-6 bg-[#A09BD3]/20 rounded-full w-24" />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 p-6 bg-[#1B1C31]">
          <div className="flex-1 h-12 bg-[#A09BD3]/20 rounded-lg" />
          <div className="flex-1 h-12 bg-[#6149E9]/30 rounded-lg" />
        </div>
      </div>
    )
  }

  if (variant === "profile") {
    return (
      <div className={cn("bg-[#2A2B45] rounded-2xl p-6 animate-pulse", className)}>
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-[#A09BD3]/20 mx-auto mb-4" />
        {/* Name */}
        <div className="h-6 bg-[#A09BD3]/20 rounded w-2/3 mx-auto mb-2" />
        {/* Title */}
        <div className="h-4 bg-[#A09BD3]/20 rounded w-1/2 mx-auto mb-4" />
        {/* Details */}
        <div className="space-y-2">
          <div className="h-3 bg-[#A09BD3]/20 rounded w-3/4 mx-auto" />
          <div className="h-3 bg-[#A09BD3]/20 rounded w-2/3 mx-auto" />
        </div>
      </div>
    )
  }

  if (variant === "avatar") {
    return (
      <div className={cn("rounded-full bg-[#A09BD3]/20 animate-pulse", className)} />
    )
  }

  if (variant === "text") {
    return (
      <div className={cn("h-4 bg-[#A09BD3]/20 rounded animate-pulse", className)} />
    )
  }

  // Default card variant
  return (
    <div className={cn("bg-[#2A2B45] rounded-2xl p-6 animate-pulse", className)}>
      <div className="space-y-3">
        <div className="h-4 bg-[#A09BD3]/20 rounded w-3/4" />
        <div className="h-4 bg-[#A09BD3]/20 rounded w-1/2" />
        <div className="h-4 bg-[#A09BD3]/20 rounded w-5/6" />
      </div>
    </div>
  )
}

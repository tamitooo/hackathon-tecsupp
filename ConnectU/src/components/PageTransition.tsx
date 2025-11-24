import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export default function PageTransition({ children, className }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  )
}

// Staggered animation for lists
interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}

export function StaggeredList({ children, className, staggerDelay = 100 }: StaggeredListProps) {
  const [visibleItems, setVisibleItems] = useState<number>(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    
    children.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleItems(prev => prev + 1)
      }, index * staggerDelay)
      timers.push(timer)
    })

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [children.length, staggerDelay])

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-500 ease-out",
            index < visibleItems
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

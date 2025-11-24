import { Check } from "lucide-react"
import { cn } from "../lib/utils"

interface StepperProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export default function Stepper({ currentStep, totalSteps, className }: StepperProps) {
  return (
    <div className={cn("flex items-center ", className)}>
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isCompleted = step < currentStep
        const isCurrent = step === currentStep
        const isUpcoming = step > currentStep

        return (
          <div key={step} className="flex items-center flex-1">
            {/* Step Circle */}
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                isCompleted &&
                  "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30",
                isCurrent &&
                  "bg-gradient-to-br from-[#6149E9] to-[#7c5ef0] text-white shadow-lg shadow-[#6149E9]/30 scale-110",
                isUpcoming && "bg-[#2A2B45] text-[#A09BD3]",
              )}
            >
              {isCompleted ? <Check size={20} /> : step}
            </div>

             {/* Connector Line */}
            {step < totalSteps && (
              <div
                className={cn(
                  "w-16 h-1 mx-2 rounded transition-all duration-300", // Cambiado a width fijo
                  step < currentStep ? "bg-green-500" : "bg-[#2A2B45]",
                )}
              ></div>
            )}
          </div>
        )
      })}
    </div>
  )
}

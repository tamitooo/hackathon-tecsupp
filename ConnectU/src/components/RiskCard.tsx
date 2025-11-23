import { AlertTriangle, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { cn } from "../lib/utils"

interface RiskCardProps {
  riskLevel: "low" | "medium" | "high" | "critical"
  riskScore: number
  courses?: Array<{ name: string; grade: number; risk: string }>
  className?: string
}

export default function RiskCard({ riskLevel, riskScore, courses = [], className }: RiskCardProps) {
  const riskConfig = {
    low: {
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      gradient: "from-green-500/20 to-green-600/10",
      icon: TrendingUp,
      label: "Low Risk",
      message: "You're doing great! Keep up the good work.",
    },
    medium: {
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      gradient: "from-yellow-500/20 to-yellow-600/10",
      icon: Minus,
      label: "Medium Risk",
      message: "Some courses need attention. Consider finding a mentor.",
    },
    high: {
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      gradient: "from-orange-500/20 to-orange-600/10",
      icon: TrendingDown,
      label: "High Risk",
      message: "Action needed! Let's find you a mentor to help.",
    },
    critical: {
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      gradient: "from-red-500/20 to-red-600/10",
      icon: AlertTriangle,
      label: "Critical Risk",
      message: "Immediate attention required! Connect with a mentor now.",
    },
  }

  const config = riskConfig[riskLevel]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "bg-[#1B1C31]/80 backdrop-blur-sm border rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]",
        config.borderColor,
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", config.bgColor)}>
            <Icon size={24} className={config.color} />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">Academic Risk</h3>
            <p className={cn("text-sm font-semibold", config.color)}>{config.label}</p>
          </div>
        </div>

        {/* Risk Score */}
        <div className="text-right">
          <div className={cn("text-3xl font-bold", config.color)}>{riskScore}%</div>
          <p className="text-[#A09BD3] text-xs">Risk Score</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-[#2A2B45] rounded-full h-3 overflow-hidden">
          <div
            className={cn("h-3 rounded-full transition-all duration-500 bg-gradient-to-r", config.gradient)}
            style={{ width: `${riskScore}%` }}
          />
        </div>
      </div>

      {/* Message */}
      <p className="text-white text-sm mb-6">{config.message}</p>

      {/* Critical Courses */}
      {courses.length > 0 && (
        <div>
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className={config.color} />
            Critical Courses
          </h4>
          <div className="space-y-2">
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#0f0f1e]/50 rounded-lg border border-[#A09BD3]/10"
              >
                <div>
                  <p className="text-white text-sm font-medium">{course.name}</p>
                  <p className="text-[#A09BD3] text-xs">Current Grade: {course.grade}</p>
                </div>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold",
                    course.risk === "high" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400",
                  )}
                >
                  {course.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

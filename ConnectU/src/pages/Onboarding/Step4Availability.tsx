"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import PageTransition from "../../components/PageTransition"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)

export default function Step4Availability() {
  const [availability, setAvailability] = useState<Record<string, boolean[]>>(
    DAYS.reduce((acc, day) => ({ ...acc, [day]: Array(24).fill(false) }), {}),
  )
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setOnboardingCompleted, setUser, email } = useAuthStore()

  const toggleHour = (day: string, hour: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((val, i) => (i === hour ? !val : val)),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const onboarding = JSON.parse(sessionStorage.getItem("onboarding") || "{}")

      // Crear usuario con la estructura correcta según tu interface User
      const mockUser = {
        id: Date.now().toString(),
        email: email || onboarding.email || "user@universidad.edu.pe",
        firstName: onboarding.firstName || "",
        lastName: onboarding.lastName || "",
        university: onboarding.university || "",
        career: onboarding.career || "",
        semester: parseInt(onboarding.semester) || 1,
        bio: `Interests: ${onboarding.careerInterests || ''}. Goals: ${onboarding.futureRoles || ''}`
      }

      setUser(mockUser)
      setOnboardingCompleted(true)
      sessionStorage.removeItem("onboarding")
      navigate("/")
    } catch (err) {
      console.error("Onboarding failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1e] via-[#1B1C31] to-[#0f0f1e] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#1B1C31]/80 backdrop-blur-sm border border-[#A09BD3]/20 rounded-2xl p-8 shadow-2xl">
          {/* Progress Steps */}
          <Stepper currentStep={4} totalSteps={4} className="mb-8" />

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Your Availability</h2>
            <p className="text-[#A09BD3] text-sm mb-1">Step 4 of 4: When are you available?</p>
            <p className="text-[#6149E9] text-xs">💡 Click on the hours you're available each day</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#6149E9] scrollbar-track-[#2A2B45]">
              {DAYS.map((day) => (
                <div key={day} className="border border-[#A09BD3]/20 rounded-xl p-4 bg-[#0f0f1e]/50">
                  <p className="font-semibold text-white text-base mb-3">{day}</p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {HOURS.map((hour, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleHour(day, i)}
                        className={`p-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          availability[day][i]
                            ? "bg-gradient-to-br from-[#6149E9] to-[#7c5ef0] text-white shadow-lg shadow-[#6149E9]/30 scale-105"
                            : "bg-[#2A2B45] text-[#A09BD3] hover:bg-[#3A3B55] hover:scale-105"
                        }`}
                      >
                        {hour.split(':')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Select Options */}
            <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-[#A09BD3]/10">
              <button
                type="button"
                onClick={() => {
                  const allTrue = DAYS.reduce((acc, day) => ({ ...acc, [day]: Array(24).fill(true) }), {})
                  setAvailability(allTrue)
                }}
                className="px-4 py-2 rounded-lg bg-[#2A2B45] text-[#A09BD3] hover:bg-[#3A3B55] text-xs font-medium transition-all"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={() => {
                  const allFalse = DAYS.reduce((acc, day) => ({ ...acc, [day]: Array(24).fill(false) }), {})
                  setAvailability(allFalse)
                }}
                className="px-4 py-2 rounded-lg bg-[#2A2B45] text-[#A09BD3] hover:bg-[#3A3B55] text-xs font-medium transition-all"
              >
                Clear All
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => navigate("/onboarding/step3")}
              >
                ← Back
              </Button>
              <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={loading}>
                {loading ? "Completing... ✨" : "Complete Setup 🚀"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </PageTransition>
  )
}
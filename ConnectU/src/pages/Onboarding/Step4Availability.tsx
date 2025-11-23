"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import Button from "../../components/Button"

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
    <div className="min-h-screen bg-[#1B1C31]">
      {/* Navbar */}
      <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="flex items-center">
            <img 
              src="/LOGOCONECTU.png" 
              alt="ConnectU Logo" 
              className="h-8 w-auto" // Ajusta el tamaño según necesites
            />
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center p-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-4xl bg-[#1B1C31] text-white">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Your Availability</h2>
              <p className="text-[#A09BD3] text-lg mt-2">Step 4 of 4: When are you available?</p>
              <p className="text-[#6149E9] text-sm mt-2">Click on the hours you're available each day</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto p-2">
                {DAYS.map((day) => (
                  <div key={day} className="border border-[#A09BD3] rounded-lg p-4 bg-[#1B1C31]">
                    <p className="font-semibold text-white text-lg mb-3">{day}</p>
                    <div className="grid grid-cols-4 gap-2">
                      {HOURS.map((hour, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleHour(day, i)}
                          className={`p-2 rounded text-sm font-medium transition-colors ${
                            availability[day][i]
                              ? "bg-[#6149E9] text-white"
                              : "bg-[#2A2B45] text-[#A09BD3] hover:bg-[#3A3B55]"
                          }`}
                        >
                          {hour}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/onboarding/step3")}
                >
                  Back
                </Button>
                <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                  {loading ? "Completing..." : "Complete Setup"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
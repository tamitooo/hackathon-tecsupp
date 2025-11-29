"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { authApi } from "../../api/auth"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default function Verify() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { email, setToken, setUser } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!code || code.length !== 6) {
      setError("Please enter a 6-digit code")
      return
    }

    try {
      setLoading(true)
      const response = await authApi.verifyCode(email, code)
      
      if (response.data.success) {
        const user = response.data.user
        
        // Generate a simple token
        const token = `token_${user.id}_${Date.now()}`
        setToken(token)
        
        // Store user data (even if incomplete) for onboarding to access user.id
        setUser({
          id: user.id,
          email: user.email,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          university: "",
          career: "",
          semester: 1
        })
        
        // Check if user has completed onboarding
        if (user.onboardingCompleted) {
          // User already onboarded, go to main app
          navigate("/")
        } else {
          // New user or incomplete onboarding, go to onboarding
          navigate("/onboarding/step1")
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.response?.data?.message || "Invalid verification code")
    } finally {
      setLoading(false)
    }
  }

  const handleSkipVerification = () => {
    // Función para saltar verificación y ir directo al onboarding
    const mockToken = "mock_token_skip_" + Date.now()
    setToken(mockToken)
    navigate("/onboarding/step1")
  }

  return (
    <div className="min-h-screen bg-[#1B1C31]">
    {/* Navbar */}
        <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/LOGOCONECTU.png" 
                alt="ConnectU Logo" 
                className="h-8 w-auto"
              />

              <span className="font-poppins text-white font-extralight text-xl">
                ConectU
              </span>
            </Link>
          </div>
        </nav>

      {/* Verify Content */}
      <div className="flex items-center justify-center p-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md bg-[#1B1C31] text-white">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Verify your email</h2>
            <p className="text-[#A09BD3] text-lg mt-2">We sent a code to {email}</p>
          </div>

          {/* Verification form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              error={error}
              label="Verification Code"
            />

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </form>
          {/* Testing buttons */}
          <div className="text-center mt-6 space-y-4">
            <button
              onClick={() => setCode("123456")}
              className="text-[#6149E9] font-semibold cursor-pointer hover:underline block w-full"
            >
              Usar código: 123456
            </button>
            
            <button
              onClick={handleSkipVerification}
              className="text-[#A09BD3] font-semibold cursor-pointer hover:underline block w-full"
            >
              Saltar verificación →
            </button>
          </div>

          {/* Resend code */}
          <div className="text-center mt-8">
            <p className="text-[#A09BD3] text-lg">
              Didn't receive a code?{" "}
              <span className="text-[#6149E9] font-semibold cursor-pointer hover:underline">
                Resend
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
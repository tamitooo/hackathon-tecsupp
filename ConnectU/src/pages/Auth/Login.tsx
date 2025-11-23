"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { authApi } from "../../api/auth"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { validateEmail } from "../../lib/utils"
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuthEmail = useAuthStore((state) => state.setEmail)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }

    if (!email.endsWith(".edu") && !email.includes("univ")) {
      setError("Please use your institutional email")
      return
    }

    try {
      setLoading(true)
      await authApi.sendVerification(email)
      setAuthEmail(email)
      navigate("/verify")
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send verification code")
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

      {/* Login Content */}
      <div className="flex items-center justify-center p-8 min-h-[calc(100vh-80px)]">
        <div className="max-w-md w-full bg-[#1B1C31] text-white">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Yooo, welcome back!</h1>
          </div>

          {/* Sign up prompt */}
          <div className="text-center mb-8">
            <p className="text-[#A09BD3]">
              First time here? <span className="text-[#6149E9] font-semibold cursor-pointer">Sign up for free</span>
            </p>
          </div>

          {/* Email input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              placeholder="name@universidad.edu.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              label="Your email"
            />

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Sign in"}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-[#A09BD3]">
            <p className="text-[#A09BD3] text-xs">
              You acknowledge that you read, and agree, to our{" "}
              <span className="text-[#6149E9] cursor-pointer">Terms of Service</span> and our{" "}
              <span className="text-[#6149E9] cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
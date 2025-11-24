"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { authApi } from "../../api/auth"
import PageTransition from "../../components/PageTransition"
import { validateEmail } from "../../lib/utils"
import { Link } from "react-router-dom"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true)
      // Decode JWT token to get email
      const credential = credentialResponse.credential
      const payload = JSON.parse(atob(credential.split('.')[1]))
      const googleEmail = payload.email

      // Validate institutional email
      if (!googleEmail.endsWith(".edu") && !googleEmail.includes("univ")) {
        setError("Please use your institutional email")
        return
      }

      setAuthEmail(googleEmail)
      // Skip verification for Google login
      navigate("/onboarding/step1")
    } catch (err: any) {
      setError("Google sign-in failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError("Google sign-in failed. Please try again.")
  }


  return (
    <PageTransition>
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
                First time here?{" "}
                <span 
                  onClick={() => navigate("/onboarding/step1")}
                  className="text-[#6149E9] font-semibold cursor-pointer hover:text-[#7c5ef0] transition-colors"
                >
                  Sign up for free
                </span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email input */}
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your institutional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-5 py-4 rounded-xl border-2 bg-[#2A2B45] text-white placeholder:text-[#A09BD3]/60 focus:outline-none transition-all duration-300 text-base ${
                    error 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-[#6149E9] focus:border-[#6149E9] focus:shadow-lg focus:shadow-[#6149E9]/30'
                  }`}
                />
                {error && <p className="text-red-500 text-sm px-2">{error}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-5 py-4 rounded-xl border-2 border-[#A09BD3]/30 bg-[#2A2B45] text-white placeholder:text-[#A09BD3]/60 focus:outline-none focus:border-[#6149E9] focus:shadow-lg focus:shadow-[#6149E9]/30 transition-all duration-300 text-base"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A09BD3] hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-5 h-5 border-2 border-[#6149E9] rounded bg-transparent peer-checked:bg-[#6149E9] transition-all"></div>
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="text-[#A09BD3] group-hover:text-white transition-colors">Keep me signed in</span>
                </label>
                <button type="button" className="text-[#6149E9] hover:text-[#7c5ef0] transition-colors font-medium">
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6149E9] to-[#7c5ef0] text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#6149E9]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#A09BD3]/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#1B1C31] text-[#A09BD3]">Or continue with</span>
                </div>
              </div>

              {/* Custom Google Button que combina con el diseño */}
              <button
                type="button"
                onClick={handleGoogleSuccess}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl border-2 border-[#A09BD3]/30 bg-[#2A2B45] text-white font-semibold text-lg hover:border-[#6149E9] hover:bg-[#2A2B45]/80 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="group-hover:text-[#6149E9] transition-colors">Continue with Google</span>
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-[#A09BD3]">
              <p className="text-[#A09BD3] text-xs">
                You acknowledge that you read, and agree, to our{" "}
                <span className="text-[#6149E9] cursor-pointer hover:text-[#7c5ef0] transition-colors">Terms of Service</span> and our{" "}
                <span className="text-[#6149E9] cursor-pointer hover:text-[#7c5ef0] transition-colors">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
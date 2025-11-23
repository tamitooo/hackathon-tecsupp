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
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1e] via-[#1B1C31] to-[#0f0f1e] flex items-center justify-center p-4">
      {/* Centered Card */}
      <div className="w-full max-w-md">
        {/* Card Container with subtle border and backdrop blur */}
        <div className="bg-[#1B1C31]/80 backdrop-blur-sm border border-[#A09BD3]/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo at top */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sign up & verify</h1>
            <p className="text-[#A09BD3] text-sm">
              Sign up and complete identity verification to earn a random reward.
            </p>
          </div>

          {/* Email input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-5 py-4 rounded-xl border-2 bg-[#0f0f1e] text-white placeholder:text-[#A09BD3]/60 focus:outline-none transition-all duration-300 text-base ${
                  error 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-[#6149E9] focus:border-[#6149E9] focus:shadow-lg focus:shadow-[#6149E9]/30'
                }`}
              />
              {error && <p className="text-red-500 text-sm px-2">{error}</p>}
            </div>

            {/* Password Input (placeholder for design) */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-5 py-4 rounded-xl border-2 border-[#A09BD3]/30 bg-[#0f0f1e] text-white placeholder:text-[#A09BD3]/60 focus:outline-none focus:border-[#6149E9] focus:shadow-lg focus:shadow-[#6149E9]/30 transition-all duration-300 text-base"
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
              <button type="button" className="text-white hover:text-[#6149E9] transition-colors font-medium">
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

            {/* Google Sign In */}
            <div className="flex justify-center">
              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="filled_black"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="380"
                />
              </GoogleOAuthProvider>
            </div>
          </form>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-[#A09BD3] text-sm">
              Don't have an account? <Link to="/onboarding/step1" className="text-white font-semibold hover:text-[#6149E9] transition-colors">Sign Up</Link>
            </p>
          </div>
        </div>
        </div>
      </div>
    </PageTransition>
  )
}
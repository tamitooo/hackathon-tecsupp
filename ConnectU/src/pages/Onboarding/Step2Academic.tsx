"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import PageTransition from "../../components/PageTransition"

export default function Step2Academic() {
  const [data, setData] = useState({
    strengths: "",
    weaknesses: "",
    studyStyle: "",
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const onboarding = JSON.parse(sessionStorage.getItem("onboarding") || "{}")
    sessionStorage.setItem("onboarding", JSON.stringify({ ...onboarding, ...data }))
    navigate("/onboarding/step3")
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1e] via-[#1B1C31] to-[#0f0f1e] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
          <Stepper currentStep={2} totalSteps={4} className="mb-8" />

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Academic Profile</h2>
            <p className="text-[#A09BD3] text-sm">Step 2 of 4: Your Strengths & Weaknesses</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#A09BD3]">What are your strengths?</label>
              <textarea
                name="strengths"
                placeholder="e.g., Mathematics, Writing, Problem-solving..."
                value={data.strengths}
                onChange={(e) => setData((prev) => ({ ...prev, strengths: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl border-2 border-[#A09BD3]/30 bg-[#0f0f1e] text-white placeholder:text-[#A09BD3]/60 focus:outline-none focus:border-[#6149E9] focus:shadow-lg focus:shadow-[#6149E9]/30 transition-all duration-300 text-base"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#A09BD3]">Areas to improve?</label>
              <textarea
                name="weaknesses"
                placeholder="e.g., Time management, specific subjects..."
                value={data.weaknesses}
                onChange={(e) => setData((prev) => ({ ...prev, weaknesses: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl border-2 border-[#A09BD3]/30 bg-[#0f0f1e] text-white placeholder:text-[#A09BD3]/60 focus:outline-none focus:border-[#6149E9] focus:shadow-lg focus:shadow-[#6149E9]/30 transition-all duration-300 text-base"
                rows={3}
              />
            </div>

            <Input
              name="studyStyle"
              placeholder="Your preferred study style (e.g., collaborative, independent...)"
              value={data.studyStyle}
              onChange={handleChange}
            />

            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => navigate("/onboarding/step1")}
              >
                ← Back
              </Button>
              <Button type="submit" variant="primary" size="lg" className="flex-1">
                Next Step →
              </Button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </PageTransition>
  )
}
"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import PageTransition from "../../components/PageTransition"

export default function Step3Vocational() {
  const [data, setData] = useState({
    careerInterests: "",
    futureRoles: "",
    skillsToLearn: "",
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
    navigate("/onboarding/step4")
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
          <Stepper currentStep={3} totalSteps={4} className="mb-8" />

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Career Goals</h2>
            <p className="text-[#A09BD3] text-sm">Step 3 of 4: Your Future Path</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="careerInterests"
              placeholder="Career interests (e.g., AI, Web Development, Data Science)"
              value={data.careerInterests}
              onChange={handleChange}
              label="Career Interests"
            />

            <Input
              name="futureRoles"
              placeholder="Future roles you're interested in"
              value={data.futureRoles}
              onChange={handleChange}
              label="Dream Roles"
            />

            <Input
              name="skillsToLearn"
              placeholder="Skills you want to develop (comma separated)"
              value={data.skillsToLearn}
              onChange={handleChange}
              label="Skills to Learn"
            />

            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => navigate("/onboarding/step2")}
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
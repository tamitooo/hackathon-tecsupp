"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import PageTransition from "../../components/PageTransition"

export default function Step1Basic() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    university: "",
    career: "",
    semester: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!data.firstName.trim()) newErrors.firstName = "First name is required"
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!data.university.trim()) newErrors.university = "University is required"
    if (!data.career.trim()) newErrors.career = "Career is required"
    if (!data.semester || Number.parseInt(data.semester) < 1 || Number.parseInt(data.semester) > 12) {
      newErrors.semester = "Semester must be between 1 and 12"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    sessionStorage.setItem("onboarding", JSON.stringify({ ...data }))
    navigate("/onboarding/step2")
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f1e] via-[#1B1C31] to-[#0f0f1e] flex items-center justify-center p-4">
      {/* Centered Card */}
      <div className="w-full max-w-2xl">
        {/* Logo at top */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-[#1B1C31]/80 backdrop-blur-sm border border-[#A09BD3]/20 rounded-2xl p-8 shadow-2xl">
          {/* Progress Steps */}
          <Stepper currentStep={1} totalSteps={4} className="mb-8" />

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Tell us about you</h2>
            <p className="text-[#A09BD3] text-sm">Step 1 of 4: Basic Information</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="firstName"
                placeholder="First name"
                value={data.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <Input
                name="lastName"
                placeholder="Last name"
                value={data.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>

            <Input
              name="university"
              placeholder="University name"
              value={data.university}
              onChange={handleChange}
              error={errors.university}
            />

            <Input
              name="career"
              placeholder="Career / Major"
              value={data.career}
              onChange={handleChange}
              error={errors.career}
            />

            <Input
              name="semester"
              type="number"
              placeholder="Current semester (1-12)"
              min="1"
              max="12"
              value={data.semester}
              onChange={handleChange}
              error={errors.semester}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full mt-8">
              Next Step →
            </Button>
          </form>
        </div>
        </div>
      </div>
    </PageTransition>
  )
}
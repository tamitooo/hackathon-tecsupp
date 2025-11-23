"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"

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
        <div className="w-full max-w-2xl bg-[#1B1C31] text-white">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Tell us about you</h2>
              <p className="text-[#A09BD3] text-lg mt-2">Step 1 of 4: Basic Information</p>
            </div>

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
                placeholder="Current semester"
                min="1"
                max="12"
                value={data.semester}
                onChange={handleChange}
                error={errors.semester}
              />

              <Button type="submit" variant="primary" size="lg" className="w-full mt-6">
                Next Step
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
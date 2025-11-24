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
      <div className="min-h-screen bg-[#1B1C31]">
        {/* Navbar */}
        <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Link to="/" className="flex items-center">
              <img 
                src="/LOGOCONECTU.png" 
                alt="ConnectU Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
        </nav>
        
        {/* Content */}
        <div className="flex items-center justify-center p-8 min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-2xl bg-[#1B1C31] text-white">
            {/* Progress Steps - Centrado */}
            <div className="flex justify-center mb-8">
              <Stepper currentStep={3} totalSteps={4} />
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Career Goals</h2>
                <p className="text-[#A09BD3] text-lg mt-2">Step 3 of 4: Your Future Path</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="careerInterests"
                  placeholder="Career interests (comma separated)"
                  value={data.careerInterests}
                  onChange={handleChange}
                />

                <Input
                  name="futureRoles"
                  placeholder="Future roles you're interested in"
                  value={data.futureRoles}
                  onChange={handleChange}
                />

                <Input
                  name="skillsToLearn"
                  placeholder="Skills you want to develop (comma separated)"
                  value={data.skillsToLearn}
                  onChange={handleChange}
                />

                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/onboarding/step2")}
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    Next Step
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
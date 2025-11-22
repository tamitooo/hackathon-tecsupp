"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"

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
    <div className="min-h-screen bg-[#1B1C31]">
      {/* Navbar */}
      <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-6 py-4">
        <div className="">
          <h1 className="text-2xl font-bold text-white">ConnectU</h1>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center p-8 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-2xl bg-[#1B1C31] text-white">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Academic Profile</h2>
              <p className="text-[#A09BD3] text-lg mt-2">Step 2 of 4: Your Strengths & Weaknesses</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-3 text-[#A09BD3]">What are your strengths?</label>
                <textarea
                  name="strengths"
                  placeholder="e.g., Mathematics, Writing, Problem-solving..."
                  value={data.strengths}
                  onChange={(e) => setData((prev) => ({ ...prev, strengths: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-[#A09BD3] bg-[#1B1C31] text-white placeholder:text-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] focus:border-transparent transition-colors text-lg"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-3 text-[#A09BD3]">Areas to improve?</label>
                <textarea
                  name="weaknesses"
                  placeholder="e.g., Time management, specific subjects..."
                  value={data.weaknesses}
                  onChange={(e) => setData((prev) => ({ ...prev, weaknesses: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-[#A09BD3] bg-[#1B1C31] text-white placeholder:text-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] focus:border-transparent transition-colors text-lg"
                  rows={3}
                />
              </div>

              <Input
                name="studyStyle"
                placeholder="Your preferred study style (e.g., collaborative, independent...)"
                value={data.studyStyle}
                onChange={handleChange}
              />

              <div className="flex gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/onboarding/step1")}
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
  )
}
"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import Input from "../components/Input"
import Button from "../components/Button"
import { ArrowLeft, User, BookOpen, MapPin } from "lucide-react"

export default function EditProfile() {
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()
  const [data, setData] = useState({
    bio: user?.bio || "Hello! I'm passionate about learning and collaborating with fellow students. I believe in the power of teamwork and mutual support in achieving academic success.",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    university: user?.university || "",
    career: user?.career || "",
    semester: user?.semester?.toString() || "",
    location: "Lima, Peru",
    courses: "Calculus, Physics, Programming"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      setUser({ 
        ...user, 
        ...data,
        semester: parseInt(data.semester) || 1
      })
      navigate("/profile")
    }
  }

  return (
    <div className="min-h-screen bg-[#1B1C31]">
      {/* Navbar */}
      <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#6149E9] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-white leading-tight">Connecta</h1>
              <h1 className="text-3xl font-bold text-white leading-tight">UTEC</h1>
            </div>
          </div>
          <div className="flex space-x-8">
            <button className="text-[#A09BD3] hover:text-white transition-colors text-lg font-medium">
              About
            </button>
            <button className="text-[#A09BD3] hover:text-white transition-colors text-lg font-medium">
              Contact
            </button>
            <button className="text-[#A09BD3] hover:text-white transition-colors text-lg font-medium">
              Help
            </button>
          </div>
        </div>
      </nav>

      {/* Edit Profile Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-[#A09BD3] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Profile
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <User size={32} className="text-[#6149E9]" />
            Edit Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Preview */}
          <div className="lg:col-span-1">
            <div className="bg-[#2A2B45] rounded-2xl p-6 text-center sticky top-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6149E9] to-[#A09BD3] mx-auto flex items-center justify-center text-white text-5xl font-bold mb-4">
                {data.firstName.charAt(0) || "U"}
              </div>
              <h2 className="text-xl font-bold text-white">
                {data.firstName} {data.lastName}
              </h2>
              <p className="text-[#A09BD3]">{data.career || "Your Career"}</p>
              <p className="text-[#A09BD3] text-sm mt-2">{data.university || "Your University"}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-[#A09BD3]">
                  <MapPin size={16} />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#A09BD3]">
                  <BookOpen size={16} />
                  <span>Semester {data.semester || "1"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-[#2A2B45] rounded-2xl p-6">
                <h3 className="font-semibold text-white text-lg mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    placeholder="First name"
                    value={data.firstName}
                    onChange={handleChange}
                    label="First Name"
                  />
                  <Input
                    name="lastName"
                    placeholder="Last name"
                    value={data.lastName}
                    onChange={handleChange}
                    label="Last Name"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-[#2A2B45] rounded-2xl p-6">
                <h3 className="font-semibold text-white text-lg mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="university"
                    placeholder="University name"
                    value={data.university}
                    onChange={handleChange}
                    label="University"
                  />
                  <Input
                    name="career"
                    placeholder="Career / Major"
                    value={data.career}
                    onChange={handleChange}
                    label="Career"
                  />
                  <Input
                    name="semester"
                    type="number"
                    placeholder="Current semester"
                    min="1"
                    max="12"
                    value={data.semester}
                    onChange={handleChange}
                    label="Semester"
                  />
                  <Input
                    name="location"
                    placeholder="City, Country"
                    value={data.location}
                    onChange={handleChange}
                    label="Location"
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="bg-[#2A2B45] rounded-2xl p-6">
                <h3 className="font-semibold text-white text-lg mb-4">About Me</h3>
                <div>
                  <label className="block text-lg font-medium mb-3 text-[#A09BD3]">Bio</label>
                  <textarea
                    name="bio"
                    placeholder="Tell us about yourself, your interests, and what you're looking for in a study partner..."
                    value={data.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#A09BD3] bg-[#1B1C31] text-white placeholder:text-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] focus:border-transparent transition-colors text-lg resize-none"
                    rows={6}
                  />
                </div>
              </div>

              {/* Courses Section */}
              <div className="bg-[#2A2B45] rounded-2xl p-6">
                <h3 className="font-semibold text-white text-lg mb-4">Current Courses</h3>
                <Input
                  name="courses"
                  placeholder="e.g., Calculus, Physics, Programming (comma separated)"
                  value={data.courses}
                  onChange={handleChange}
                  label="Your Courses"
                />
                <p className="text-[#A09BD3] text-sm mt-2">Separate courses with commas</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
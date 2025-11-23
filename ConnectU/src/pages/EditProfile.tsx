"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import Input from "../components/Input"
import Button from "../components/Button"
import PageTransition from "../components/PageTransition"
import { ArrowLeft, User, BookOpen, MapPin, Camera } from "lucide-react"

export default function EditProfile() {
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Mock user para testing si no hay usuario
  const currentUser = user || {
    id: "mock-user-1",
    email: "student@utec.edu.pe",
    firstName: "Maria",
    lastName: "Rodriguez",
    university: "UTEC",
    career: "Computer Science",
    semester: 5,
    avatar: "",
    bio: "Passionate about technology and learning. Always looking for study partners and mentors to grow together."
  }

  const [data, setData] = useState({
    bio: currentUser.bio || "Hello! I'm passionate about learning and collaborating with fellow students.",
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    university: currentUser.university || "",
    career: currentUser.career || "",
    semester: currentUser.semester?.toString() || "",
    location: "Lima, Peru",
    courses: "Calculus, Physics, Programming",
    avatar: currentUser.avatar || ""
  })
  
  const [avatarPreview, setAvatarPreview] = useState<string>(currentUser.avatar || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar que sea imagen
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setAvatarPreview(base64String)
        setData((prev) => ({ ...prev, avatar: base64String }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Crear usuario actualizado
    const updatedUser = { 
      ...currentUser, 
      ...data,
      semester: parseInt(data.semester) || 1
    }
    
    // Guardar en el store
    setUser(updatedUser)
    
    // Mostrar confirmación
    alert('Profile updated successfully!')
    
    // Navegar de vuelta al perfil
    navigate("/profile")
  }

  return (
    <PageTransition>
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
              {/* Avatar con opción de cambiar */}
              <div className="relative w-32 h-32 mx-auto mb-4 group">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-4 border-[#6149E9]"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#6149E9] to-[#A09BD3] flex items-center justify-center text-white text-5xl font-bold">
                    {data.firstName.charAt(0) || "U"}
                  </div>
                )}
                
                {/* Overlay para cambiar foto */}
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-center">
                    <Camera size={32} className="text-white mx-auto mb-1" />
                    <span className="text-white text-xs">Change Photo</span>
                  </div>
                </button>
                
                {/* Input oculto para seleccionar archivo */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
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
    </PageTransition>
  )
}
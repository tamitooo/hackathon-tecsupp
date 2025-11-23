"use client"

import { useAuthStore } from "../store/authStore"
import { useUserStore } from "../store/userStore"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import PageTransition from "../components/PageTransition"
import { Edit2, Star, MapPin, Calendar, BookOpen, Trophy, Users, MessageCircle, Award } from "lucide-react"

export default function Profile() {
  const { user } = useAuthStore()
  const { badges, stats } = useUserStore()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1B1C31] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  // Datos de ejemplo para enriquecer el perfil
  const userDetails = {
    location: "Lima, Peru",
    memberSince: "2024",
    courses: ["Calculus", "Physics", "Programming"],
    achievements: [
      { name: "First Match", icon: Users },
      { name: "Study Buddy", icon: MessageCircle },
      { name: "Active Learner", icon: BookOpen }
    ]
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1B1C31]">

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Información básica */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar Section */}
            <div className="bg-[#2A2B45] rounded-2xl p-6 text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6149E9] to-[#A09BD3] mx-auto flex items-center justify-center text-white text-5xl font-bold mb-4">
                {user.firstName.charAt(0)}
              </div>
              <h1 className="text-2xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-[#A09BD3] text-lg">{user.career}</p>
              <p className="text-[#A09BD3] text-sm mt-2">{user.university}</p>
              
              {/* Detalles adicionales */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-[#A09BD3]">
                  <MapPin size={16} />
                  <span>{userDetails.location}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#A09BD3]">
                  <Calendar size={16} />
                  <span>Member since {userDetails.memberSince}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#A09BD3]">
                  <BookOpen size={16} />
                  <span>Semester {user.semester}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#2A2B45] rounded-2xl p-6">
              <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                <Trophy size={20} className="text-[#6149E9]" />
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#A09BD3]">Matches</span>
                  <span className="text-white font-semibold">{stats.matches}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A09BD3]">Level</span>
                  <span className="text-white font-semibold">{stats.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A09BD3]">Points</span>
                  <span className="text-white font-semibold">{stats.points}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A09BD3]">Study Sessions</span>
                  <span className="text-white font-semibold">{stats.sessions || 12}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="bg-[#2A2B45] rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-white text-lg">About Me</h3>
                <Button
                  onClick={() => navigate("/profile/edit")}
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </Button>
              </div>
              <p className="text-[#A09BD3] text-lg leading-relaxed">
                {user.bio || "Hello! I'm passionate about learning and collaborating with fellow students. I believe in the power of teamwork and mutual support in achieving academic success."}
              </p>
            </div>

            {/* Courses Section */}
            <div className="bg-[#2A2B45] rounded-2xl p-6">
              <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-[#6149E9]" />
                Current Courses
              </h3>
              <div className="flex flex-wrap gap-2">
                {userDetails.courses.map((course, index) => (
                  <span
                    key={index}
                    className="bg-[#6149E9] bg-opacity-20 text-[#6149E9] px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-[#2A2B45] rounded-2xl p-6">
              <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                <Award size={20} className="text-[#6149E9]" />
                Badges & Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-[#6149E9] bg-opacity-20 p-4 rounded-lg border border-[#6149E9] border-opacity-30"
                  >
                    <div className="w-10 h-10 bg-[#6149E9] rounded-full flex items-center justify-center">
                      <Star size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{badge}</p>
                      <p className="text-[#A09BD3] text-sm">Earned recently</p>
                    </div>
                  </div>
                ))}
                
                {/* Achievements adicionales */}
                {userDetails.achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-[#2A2B45] p-4 rounded-lg border border-[#A09BD3] border-opacity-20"
                    >
                      <div className="w-10 h-10 bg-[#A09BD3] bg-opacity-20 rounded-full flex items-center justify-center">
                        <Icon size={20} className="text-[#A09BD3]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{achievement.name}</p>
                        <p className="text-[#A09BD3] text-sm">Completed</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Availability Section */}
            <div className="bg-[#2A2B45] rounded-2xl p-6">
              <h3 className="font-semibold text-white text-lg mb-4">Study Availability</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Morning', 'Afternoon', 'Evening', 'Weekend'].map((time, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-[#6149E9] rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-semibold text-sm">{time.charAt(0)}</span>
                    </div>
                    <p className="text-[#A09BD3] text-sm">{time}</p>
                    <p className="text-white text-xs font-semibold">Available</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </PageTransition>
  )
}
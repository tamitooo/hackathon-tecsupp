"use client"

import { useAuthStore } from "../store/authStore"
import { useUserStore } from "../store/userStore"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import PageTransition from "../components/PageTransition"
import { Edit2, Star, MapPin, Calendar, BookOpen, Trophy, Users, MessageCircle, Award, Gift, TrendingUp, Zap } from "lucide-react"

export default function Profile() {
  const { user } = useAuthStore()
  const { badges, stats } = useUserStore()
  const navigate = useNavigate()

  // Mock user para testing si no hay usuario en el store
  const currentUser = user || {
    id: "mock-user-1",
    email: "student@utec.edu.pe",
    firstName: "Maria",
    lastName: "Rodriguez",
    university: "UTEC",
    career: "Computer Science",
    semester: 5,
    avatar: "",
    bio: "Passionate about technology and learning. Always looking for study partners and mentors to grow together. Love coding, mathematics, and solving complex problems."
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

  // Datos de ejemplo para el sistema de recompensas
  const rewardsData = {
    points: 1250,
    level: 3,
    nextLevelPoints: 500,
    sessionsCompleted: 15,
    successRate: 92,
    studentsHelped: 8,
    availableRewards: [
      { id: 1, name: "Certificado 10 horas", points: 500, category: "academic" },
      { id: 2, name: "Sesión Career Coaching", points: 800, category: "professional" },
      { id: 3, name: "Hoodie ConnectU", points: 1200, category: "tangible" }
    ],
    recentActivity: [
      { action: "Sesión completada", points: "+50", date: "Hoy" },
      { action: "Feedback positivo", points: "+25", date: "Ayer" },
      { action: "Alumno aprobó curso", points: "+200", date: "2 días" }
    ]
  }

  const getLevelColor = (level: number) => {
    const colors = ["text-gray-400", "text-green-400", "text-blue-400", "text-purple-400", "text-yellow-400", "text-red-400"]
    return colors[level] || colors[0]
  }

  const getLevelName = (level: number) => {
    const names = ["Novato", "Aprendiz", "Experto", "Maestro", "Leyenda", "Ídolo"]
    return names[level] || "Novato"
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1B1C31] px-6 py-8">

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="">
            {/* Avatar Section */}
            <div className="bg-[#2A2B45]  mb-4 rounded-2xl p-6 text-center">
              {currentUser.avatar ? (
                <img 
                  src={currentUser.avatar} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#6149E9] mx-auto mb-4 transform hover:scale-105 transition-all duration-300"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6149E9] to-[#A09BD3] mx-auto flex items-center justify-center text-white text-5xl font-bold mb-4 transform hover:scale-105 transition-all duration-300">
                  {currentUser.firstName.charAt(0)}
                </div>
              )}
              <h1 className="text-2xl font-bold text-white">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <p className="text-[#A09BD3] text-lg">{currentUser.career}</p>
              <p className="text-[#A09BD3] text-sm mt-2">{currentUser.university}</p>
              
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
                  <span>Semester {currentUser.semester}</span>
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
                  <span className="text-[#A09BD3]">Study Sessions</span>
                  <span className="text-white font-semibold">{stats.sessions || 12}</span>
                </div>
              </div>
            </div>

            {/* NUEVA SECCIÓN: Sistema de Recompensas */}
            <div className="bg-[#2A2B45] rounded-2xl p-6 mt-6">
              <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                <Gift size={20} className="text-[#6149E9]" />
                Tus Recompensas
              </h3>
              
              {/* Nivel y Puntos */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-lg font-bold ${getLevelColor(rewardsData.level)}`}>
                    Nivel {rewardsData.level} - {getLevelName(rewardsData.level)}
                  </span>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star className="w-4 h-4" />
                    <span className="font-bold">{rewardsData.points}</span>
                  </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="w-full bg-[#1B1C31] rounded-full h-2 mb-1">
                  <div 
                    className="bg-gradient-to-r from-[#6149E9] to-[#A09BD3] h-2 rounded-full"
                    style={{ width: `${(rewardsData.points % 1000) / 10}%` }}
                  ></div>
                </div>
                <p className="text-[#A09BD3] text-xs text-right">
                  {rewardsData.nextLevelPoints} puntos para el siguiente nivel
                </p>
              </div>

              {/* Stats rápidas */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#6149E9] bg-opacity-20 rounded-lg p-3 text-center">
                  <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
                  <div className="text-white text-sm font-semibold">{rewardsData.successRate}%</div>
                  <div className="text-[#A09BD3] text-xs">Éxito</div>
                </div>
                <div className="bg-[#6149E9] bg-opacity-20 rounded-lg p-3 text-center">
                  <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <div className="text-white text-sm font-semibold">{rewardsData.studentsHelped}</div>
                  <div className="text-[#A09BD3] text-xs">Estudiantes</div>
                </div>
              </div>

              {/* Botón a tienda */}
              <Button
                onClick={() => navigate("/rewards")}
                variant="primary"
                size="sm"
                className="w-full flex items-center justify-center gap-2"
              >
                <Gift size={16} />
                Ver Tienda
              </Button>
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
                {currentUser.bio || "Hello! I'm passionate about learning and collaborating with fellow students. I believe in the power of teamwork and mutual support in achieving academic success."}
              </p>
            </div>

            {/* NUEVA SECCIÓN: Recompensas Disponibles */}
            <div className="bg-[#2A2B45] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                  <Zap size={20} className="text-yellow-400" />
                  Recompensas Disponibles
                </h3>
                <span className="text-[#A09BD3] text-sm">
                  {rewardsData.availableRewards.length} disponibles
                </span>
              </div>
              
              <div className="space-y-3">
                {rewardsData.availableRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="flex items-center justify-between p-4 bg-[#6149E9] bg-opacity-10 rounded-lg border border-[#6149E9] border-opacity-30 hover:border-opacity-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#6149E9] rounded-full flex items-center justify-center">
                        <Gift size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{reward.name}</p>
                        <p className="text-[#A09BD3] text-sm capitalize">{reward.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-orange-400">
                        <Star size={16} />
                        <span className="font-bold">{reward.points}</span>
                      </div>
                      <button
                        onClick={() => navigate("/rewards")}
                        className="bg-[#6149E9] text-white px-3 py-1 rounded text-sm hover:bg-[#5540d6] transition-colors"
                        disabled={rewardsData.points < reward.points}
                      >
                        Canjear
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NUEVA SECCIÓN: Actividad Reciente */}
            <div className="bg-[#2A2B45] rounded-2xl p-6">
              <h3 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-green-400" />
                Actividad Reciente
              </h3>
              
              <div className="space-y-3">
                {rewardsData.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#1B1C31] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
                        <TrendingUp size={14} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{activity.action}</p>
                        <p className="text-[#A09BD3] text-xs">{activity.date}</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-bold text-sm">{activity.points}</span>
                  </div>
                ))}
              </div>
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
"use client"

import { useState, useEffect } from "react"
import SwipeCard from "../components/SwipeCard"
import Button from "../components/Button"
import RiskCard from "../components/RiskCard"
import PageTransition from "../components/PageTransition"
import { useNavigate } from "react-router-dom"
import { Target, Users, TrendingUp, Sparkles, Zap, BookOpen, Award, Clock, User, MessageCircle, Star } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import { matchesApi } from "../api/matches"

interface Candidate {
  id: string
  name: string
  career: string
  university: string
  semester: number
  avatar?: string
  commonInterests: string[]
  compatibility: number
  matchType: "MENTOR" | "PEER" | "VOCATIONAL_BRIDGE"
  matchReasons: string[]
  bio: string
  location: string
  studyStyle: string
  availability: string[]
  skills: string[]
}

export default function Home() {
  const { user } = useAuthStore()
  const [showSwipeMode, setShowSwipeMode] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "1",
      name: "Sarah Chen",
      career: "Computer Science",
      university: "UTEC",
      semester: 6,
      commonInterests: ["Machine Learning", "Web Development", "Data Science"],
      compatibility: 92,
      matchType: "MENTOR",
      matchReasons: ["Similar interests", "2 years ahead", "Expert in your field"],
      bio: "Passionate about AI and helping students succeed. Currently interning at Google as a Machine Learning Engineer.",
      location: "Lima, Peru",
      studyStyle: "Collaborative & Structured",
      availability: ["Evenings", "Weekends"],
      skills: ["Python", "TensorFlow", "React", "Node.js"]
    },
    {
      id: "2",
      name: "Juan Martinez",
      career: "Engineering",
      university: "UTEC",
      semester: 3,
      commonInterests: ["Robotics", "Leadership", "Renewable Energy"],
      compatibility: 78,
      matchType: "PEER",
      matchReasons: ["Same career path", "Shared goals", "Complementary skills"],
      bio: "Engineering student focused on sustainable solutions. Love working in teams and sharing knowledge.",
      location: "Lima, Peru",
      studyStyle: "Hands-on & Practical",
      availability: ["Afternoons", "Weekdays"],
      skills: ["CAD", "Physics", "Mathematics", "Team Leadership"]
    },
    {
      id: "3",
      name: "Maria Garcia",
      career: "Data Science",
      university: "UTEC",
      semester: 5,
      commonInterests: ["Statistics", "Python", "Business Analytics"],
      compatibility: 85,
      matchType: "VOCATIONAL_BRIDGE",
      matchReasons: ["Industry experience", "Career guidance", "Networking opportunities"],
      bio: "Data scientist with internship experience at top tech companies. Enjoy mentoring and career coaching.",
      location: "Lima, Peru",
      studyStyle: "Analytical & Discussion-based",
      availability: ["Flexible", "By appointment"],
      skills: ["Python", "SQL", "Tableau", "Statistical Analysis"]
    }
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    swipesToday: 0,
    matchesThisWeek: 0,
    profileViews: 0
  })
  const [streak] = useState(3)
  const [todayGoal] = useState({ current: 2, total: 5 })
  const [recentActivity] = useState([
    { type: 'match', name: 'Sarah Chen', time: '2 hours ago', icon: Users },
    { type: 'study', name: 'Calculus Study Session', time: '5 hours ago', icon: BookOpen },
    { type: 'achievement', name: '3 Day Streak!', time: 'Today', icon: Award },
  ])
  const navigate = useNavigate()

  useEffect(() => {
    fetchCandidates()
    setStats({
      swipesToday: 12,
      matchesThisWeek: 3,
      profileViews: 8
    })
  }, [])

  const fetchCandidates = async () => {
    try {
      setLoading(true)
      
      if (user?.id) {
        const response = await matchesApi.getCandidates(user.id)
        if (response.data.success) {
          const backendCandidates = response.data.data.map((candidate: any) => ({
            id: candidate.id || candidate.user?.id,
            name: `${candidate.user?.firstName} ${candidate.user?.lastName}`,
            career: candidate.user?.career,
            university: "UTEC",
            semester: candidate.user?.semester,
            avatar: candidate.user?.profileImage,
            commonInterests: candidate.commonInterests || [],
            compatibility: candidate.compatibilityScore,
            matchType: candidate.matchType,
            matchReasons: candidate.matchReasons || [],
            bio: candidate.user?.bio,
            location: "Lima, Peru",
            studyStyle: "Collaborative",
            availability: ["Evenings", "Weekends"],
            skills: []
          }))
          
          setCandidates(backendCandidates)
        }
      }
      
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch candidates:", err)
      setLoading(false)
    }
  }

  const handleSwipe = async (direction: "left" | "right") => {
    const candidate = candidates[currentIndex]

    if (direction === "right" && user?.id) {
      try {
        const response = await matchesApi.requestMatch(
          user.id, 
          candidate.id, 
          candidate.name, 
          candidate.matchType, 
          candidate.compatibility
        )
        
        if (response.data.success) {
          console.log("Match exitoso:", response.data.message)
        }
      } catch (err) {
        console.error("Failed to request match:", err)
      }
    }

    setStats(prev => ({
      ...prev,
      swipesToday: prev.swipesToday + 1
    }))

    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      navigate("/matches")
    }
  }

  const greetingTime = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B1C31]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#A09BD3]/30 border-t-[#6149E9] animate-spin mx-auto" />
          <p className="mt-4 text-white text-lg font-medium">Buscando matches perfectos...</p>
        </div>
      </div>
    )
  }

  if (candidates.length === 0 || currentIndex >= candidates.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8 bg-[#1B1C31]">
        <div className="w-32 h-32 bg-gradient-to-br from-[#6149E9]/20 to-[#A09BD3]/20 rounded-3xl flex items-center justify-center mb-6 border border-[#A09BD3]/20">
          <Target size={60} className="text-[#6149E9]" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">¡Excelente trabajo!</h2>
        <p className="text-white text-lg mb-2">Has revisado todos los matches potenciales</p>
        <p className="text-[#A09BD3] text-sm mb-8">Vuelve más tarde para nuevos candidatos o revisa tus matches</p>
        <div className="flex gap-4">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
          >
            Buscar de nuevo
          </Button>
          <Button onClick={() => navigate("/matches")} size="lg">
            Ver mis matches
          </Button>
        </div>
      </div>
    )
  }

  // Dashboard View (Default)
  if (!showSwipeMode) {
    return (
      <div className="min-h-screen bg-[#1B1C31] px-6 py-8">
        <div className="max-w-6xl mx-auto p-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">
                {greetingTime()}, {user?.firstName || 'Estudiante'}!
              </h1>
            </div>
            <p className="text-[#A09BD3] text-lg">
              Listo para potenciar tu journey académico? Descubre lo que tenemos para ti hoy.
            </p>
          </div>

          {/* Risk Card */}
          <div className="mb-8">
            <RiskCard 
              riskLevel="medium"
              riskScore={65}
              courses={[
                { name: "Cálculo II", grade: 12, risk: "high" },
                { name: "Física I", grade: 13, risk: "medium" },
                { name: "Programación", grade: 14, risk: "medium" }
              ]}
            />
          </div>

          {/* Main CTA Section */}
          <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-8 mb-8 text-center group hover:border-[#6149E9]/50 transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Users size={32} className="text-white" />
              </div>
            </div>
              
            <h2 className="text-2xl font-bold text-white mb-3">
              Descubre Tu Squad de Estudio
            </h2>
              
            <p className="text-[#A09BD3] mb-6 max-w-2xl mx-auto leading-relaxed">
              Hemos seleccionado <span className="text-[#6149E9] font-semibold">{candidates.length} estudiantes increíbles</span> que coinciden con tu estilo y pueden ayudarte a dominar esos cursos.
            </p>
              
            <Button 
              size="lg" 
              onClick={() => setShowSwipeMode(true)}
              className="gap-2"
            >
              <Zap size={20} />
              ¡Empecemos!
            </Button>
              
            <p className="text-[#A09BD3]/60 text-sm mt-4">
              Desliza a la derecha para conectar, a la izquierda para pasar
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button 
              onClick={() => setShowSwipeMode(true)}
              className="bg-[#6149E9] rounded-xl p-4 text-left hover:scale-105 transition-all duration-300 group"
            >
              <Zap className="text-white w-6 h-6 mb-2" />
              <p className="text-white font-semibold text-sm">Match Rápido</p>
              <p className="text-white/70 text-xs">Encuentra partners</p>
            </button>

            <button 
              onClick={() => navigate('/matches')}
              className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl p-4 text-left hover:scale-105 hover:border-[#6149E9]/50 transition-all duration-300"
            >
              <MessageCircle className="text-[#6149E9] w-6 h-6 mb-2" />
              <p className="text-white font-semibold text-sm">Mis Matches</p>
              <p className="text-[#A09BD3] text-xs">Ver conexiones</p>
            </button>

            <button 
              onClick={() => navigate('/profile')}
              className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl p-4 text-left hover:scale-105 hover:border-[#6149E9]/50 transition-all duration-300"
            >
              <User className="text-[#A09BD3] w-6 h-6 mb-2" />
              <p className="text-white font-semibold text-sm">Mi Perfil</p>
              <p className="text-[#A09BD3] text-xs">Ver perfil</p>
            </button>

            <button 
              onClick={() => navigate('/rewards')}
              className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl p-4 text-left hover:scale-105 hover:border-[#6149E9]/50 transition-all duration-300"
            >
              <Award className="text-[#A09BD3] w-6 h-6 mb-2" />
              <p className="text-white font-semibold text-sm">Recompensas</p>
              <p className="text-[#A09BD3] text-xs">Ver logros</p>
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6 hover:border-[#6149E9]/50 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6149E9]/20 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-[#6149E9]" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm font-medium">Esperando por ti</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-white text-2xl font-bold">{candidates.length}</p>
                    <span className="text-[#6149E9] text-xs font-semibold">estudiantes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6 hover:border-[#6149E9]/50 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6149E9]/20 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-[#6149E9]" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm font-medium">Calidad de Match</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-white text-2xl font-bold">85%</p>
                    <span className="text-[#6149E9] text-xs font-semibold">excelente</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6 hover:border-[#6149E9]/50 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6149E9]/20 rounded-xl flex items-center justify-center">
                  <Sparkles size={24} className="text-[#6149E9]" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm font-medium">En línea ahora</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-white text-2xl font-bold">24</p>
                    <span className="text-[#6149E9] text-xs font-semibold">activos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Progress */}
          <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#6149E9]/20 rounded-xl flex items-center justify-center">
                  <Star className="text-[#6149E9] w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Racha Diaria</h3>
                  <p className="text-[#A09BD3] text-sm">{streak} días consecutivos</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-3xl">{todayGoal.current}/{todayGoal.total}</p>
                <p className="text-[#A09BD3] text-xs">conexiones hoy</p>
              </div>
            </div>
            
            <div className="relative h-3 bg-[#1B1C31] rounded-full overflow-hidden mb-3">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6149E9] to-[#A09BD3] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(todayGoal.current / todayGoal.total) * 100}%` }}
              />
            </div>
            
            <p className="text-[#A09BD3] text-sm">
              {todayGoal.current >= todayGoal.total ? (
                <span className="text-[#6149E9] font-semibold">¡Meta alcanzada! Sigue así</span>
              ) : (
                `${todayGoal.total - todayGoal.current} más para tu meta diaria`
              )}
            </p>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
              <button className="text-[#6149E9] text-sm font-medium hover:text-[#7c5ef0] transition-colors">
                Ver todo →
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-3 bg-[#1B1C31]/50 rounded-xl hover:bg-[#1B1C31] transition-all duration-300 cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-[#6149E9]/20 rounded-lg flex items-center justify-center">
                      <Icon className="text-[#6149E9] w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{activity.name}</p>
                      <p className="text-[#A09BD3] text-xs">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#6149E9]/20 rounded-xl flex items-center justify-center">
                <Sparkles className="text-[#6149E9] w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Tu Plan de Acción Personalizado</h3>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-4 bg-[#1B1C31]/50 rounded-xl border border-[#6149E9]/20">
                <div className="w-10 h-10 bg-[#6149E9]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-[#6149E9] w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">Cálculo II necesita atención</p>
                    <span className="px-2 py-0.5 bg-[#6149E9]/20 text-[#6149E9] text-xs font-semibold rounded-full">
                      Prioridad Alta
                    </span>
                  </div>
                  <p className="text-[#A09BD3] text-sm leading-relaxed">
                    Esta es tu materia más difícil. Encontramos <span className="text-white font-semibold">3 mentores</span> que la dominan y están listos para ayudarte.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start gap-3 p-4 bg-[#1B1C31]/50 rounded-xl border border-[#A09BD3]/20">
                <div className="w-10 h-10 bg-[#A09BD3]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="text-[#A09BD3] w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">Únete a un squad de estudio</p>
                    <span className="px-2 py-0.5 bg-[#A09BD3]/20 text-[#A09BD3] text-xs font-semibold rounded-full">
                      5 disponibles
                    </span>
                  </div>
                  <p className="text-[#A09BD3] text-sm leading-relaxed">
                    Estudiantes de tus mismos cursos están formando grupos. ¡Únete y aprendan juntos!
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#A09BD3]/10">
              <div className="flex items-start gap-2">
                <Clock className="text-[#A09BD3] w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-[#A09BD3] text-xs">
                  <span className="text-white font-semibold">Tip profesional:</span> Estudiantes que se conectan con mentores en su primera semana mejoran sus notas en un 15%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Swipe Mode View
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1B1C31]">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto p-6 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSwipeMode(false)}
          >
            ← Volver al Dashboard
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-6">
          {/* Header with Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center">
                  <Target size={24} className="text-white" />
                </div>
                Descubrir Matches
              </h1>
              <p className="text-[#A09BD3] text-lg mt-2">
                Desliza a la derecha para conectar, a la izquierda para pasar
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl px-6 py-4 text-center">
                <div className="text-[#6149E9] font-bold text-2xl">{stats.swipesToday}</div>
                <p className="text-[#A09BD3] text-xs font-medium">Hoy</p>
              </div>
              <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl px-6 py-4 text-center">
                <div className="text-[#6149E9] font-bold text-2xl">{stats.matchesThisWeek}</div>
                <p className="text-[#A09BD3] text-xs font-medium">Matches</p>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white text-sm font-medium">
                Candidato {currentIndex + 1} de {candidates.length}
              </span>
              <span className="text-[#6149E9] font-bold text-lg">
                {Math.round(((currentIndex + 1) / candidates.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-[#1B1C31] rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#6149E9] to-[#A09BD3] h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / candidates.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Swipe Card */}
          <div className="max-w-lg mx-auto">
            <SwipeCard 
              candidate={candidates[currentIndex]} 
              onSwipe={handleSwipe}
              additionalInfo={{
                bio: candidates[currentIndex].bio,
                location: candidates[currentIndex].location,
                studyStyle: candidates[currentIndex].studyStyle,
                availability: candidates[currentIndex].availability,
                skills: candidates[currentIndex].skills
              }}
            />
          </div>

          {/* Tips Card */}
          <div className="text-center mt-8">
            <div className="inline-block bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl px-6 py-4">
              <p className="text-white text-sm font-medium">
                {candidates[currentIndex].matchType === "MENTOR" 
                  ? "¡Gran oportunidad para aprender de alguien con experiencia!"
                  : candidates[currentIndex].matchType === "PEER"
                  ? "¡Perfecto para aprendizaje colaborativo y apoyo mutuo!"
                  : "¡Excelente para orientación profesional y networking!"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
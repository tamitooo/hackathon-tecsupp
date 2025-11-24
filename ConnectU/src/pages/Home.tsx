"use client"

import { useState, useEffect } from "react"
import SwipeCard from "../components/SwipeCard"
import Button from "../components/Button"
import RiskCard from "../components/RiskCard"
import PageTransition from "../components/PageTransition"
import { useNavigate } from "react-router-dom"
import { Target, Users, TrendingUp, Sparkles, Zap, Heart, BookOpen, Award, Clock } from "lucide-react"
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
    { type: 'match', name: 'Sarah Chen', time: '2 hours ago', icon: '🤝' },
    { type: 'study', name: 'Calculus Study Session', time: '5 hours ago', icon: '📚' },
    { type: 'achievement', name: 'Week Streak!', time: 'Today', icon: '🔥' },
  ])
  const navigate = useNavigate()

  useEffect(() => {
    fetchCandidates()
    // Simular stats del usuario
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
          // Convertir datos del backend al formato que espera el frontend
          const backendCandidates = response.data.data.map((candidate: any) => ({
            id: candidate.id || candidate.user?.id,
            name: `${candidate.user?.firstName} ${candidate.user?.lastName}`,
            career: candidate.user?.career,
            university: "UTEC", // Hardcoded por ahora
            semester: candidate.user?.semester,
            avatar: candidate.user?.profileImage,
            commonInterests: candidate.commonInterests || [],
            compatibility: candidate.compatibilityScore,
            matchType: candidate.matchType,
            matchReasons: candidate.matchReasons || [],
            bio: candidate.user?.bio,
            location: "Lima, Peru", // Hardcoded por ahora
            studyStyle: "Collaborative", // Hardcoded por ahora
            availability: ["Evenings", "Weekends"], // Hardcoded por ahora
            skills: []
          }))
          
          setCandidates(backendCandidates)
        }
      }
      
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch candidates:", err)
      // Fallback a datos mock en caso de error
      setLoading(false)
    }
  }

  const handleSwipe = async (direction: "left" | "right") => {
    const candidate = candidates[currentIndex]

    if (direction === "right" && user?.id) {
      try {
        // Llamar al backend para crear el match
        const response = await matchesApi.requestMatch(
          user.id, 
          candidate.id, 
          candidate.name, 
          candidate.matchType, 
          candidate.compatibility
        )
        
        if (response.data.success) {
          console.log("✅ Match exitoso:", response.data.message)
        }
      } catch (err) {
        console.error("Failed to request match:", err)
      }
    }

    // Actualizar stats
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


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#A09BD3]/30 border-t-[#6149E9] animate-spin mx-auto shadow-lg shadow-[#6149E9]/30" />
          <p className="mt-4 text-white text-lg font-medium">Finding great matches for you...</p>
        </div>
      </div>
    )
  }

  if (candidates.length === 0 || currentIndex >= candidates.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">
        <div className="w-32 h-32 bg-gradient-to-br from-[#6149E9]/20 to-[#A09BD3]/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm border border-[#A09BD3]/20">
          <Target size={60} className="text-[#6149E9]" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Great job! 🎉</h2>
        <p className="text-white text-lg mb-2">You've reviewed all potential matches</p>
        <p className="text-[#A09BD3] text-sm mb-8">Check back later for new candidates or review your matches</p>
        <div className="flex gap-4">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
          >
            Swipe Again
          </Button>
          <Button onClick={() => navigate("/matches")} size="lg">
            View My Matches
          </Button>
        </div>
      </div>
    )
  }

  // Dashboard View (Default)
  if (!showSwipeMode) {
    const greetingTime = () => {
      const hour = new Date().getHours()
      if (hour < 12) return "Good morning"
      if (hour < 18) return "Good afternoon"
      return "Good evening"
    }

    return (
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header with Animation */}
          <div className="mb-8 relative">
            {/* Floating decoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#6149E9]/20 to-[#A09BD3]/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -top-2 -right-8 w-32 h-32 bg-gradient-to-br from-[#A09BD3]/20 to-[#6149E9]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white animate-fade-in">
                  {greetingTime()}, {user?.firstName || 'Student'}!
                </h1>
                <span className="text-3xl animate-bounce">👋</span>
              </div>
              <p className="text-[#A09BD3] text-lg">
                Ready to level up your academic journey? Let's see what we have for you today ✨
              </p>
            </div>
          </div>

          {/* Risk Card - Prominent */}
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

          {/* CTA Section - Enhanced */}
          <div className="relative bg-gradient-to-r from-[#6149E9]/10 via-[#7c5ef0]/10 to-[#A09BD3]/10 border border-[#6149E9]/30 rounded-2xl p-8 mb-8 text-center overflow-hidden group hover:border-[#6149E9]/50 transition-all duration-300">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6149E9]/5 to-[#A09BD3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Users size={32} className="text-white" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 text-yellow-400 w-5 h-5 animate-pulse" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
                Discover Your Study Squad
                <Heart className="text-red-400 w-5 h-5 animate-pulse" />
              </h2>
              
              <p className="text-[#A09BD3] mb-6 max-w-2xl mx-auto leading-relaxed">
                We've handpicked <span className="text-[#6149E9] font-semibold">{candidates.length} amazing students</span> who match your vibe and can help you crush those courses! 
                Time to find your perfect study partner 🚀
              </p>
              
              <Button 
                size="lg" 
                onClick={() => setShowSwipeMode(true)}
                className="gap-2 group/btn relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                <Zap size={20} className="animate-pulse" />
                Let's Go!
              </Button>
              
              <p className="text-[#A09BD3]/60 text-sm mt-4">
                💡 Swipe right to connect, left to skip
              </p>
            </div>
          </div>

          {/* Quick Actions Bar - NEW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button 
              onClick={() => setShowSwipeMode(true)}
              className="bg-gradient-to-br from-[#6149E9] to-[#7c5ef0] rounded-xl p-4 text-left hover:scale-105 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              <div className="relative">
                <Zap className="text-white w-6 h-6 mb-2 group-hover:rotate-12 transition-transform" />
                <p className="text-white font-semibold text-sm">Quick Match</p>
                <p className="text-white/70 text-xs">Find partners now</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/matches')}
              className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl p-4 text-left hover:scale-105 hover:border-[#6149E9]/50 transition-all duration-300 group"
            >
              <Heart className="text-red-400 w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white font-semibold text-sm">My Matches</p>
              <p className="text-[#A09BD3] text-xs">See connections</p>
            </button>

            <button 
              onClick={() => navigate('/profile')}
              className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl p-4 text-left hover:scale-105 hover:border-[#6149E9]/50 transition-all duration-300 group"
            >
              <Award className="text-yellow-400 w-6 h-6 mb-2 group-hover:rotate-12 transition-transform" />
              <p className="text-white font-semibold text-sm">My Progress</p>
              <p className="text-[#A09BD3] text-xs">View achievements</p>
            </button>

            <button 
              className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-xl p-4 text-left hover:scale-105 hover:border-[#6149E9]/50 transition-all duration-300 group"
            >
              <BookOpen className="text-blue-400 w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white font-semibold text-sm">Study Groups</p>
              <p className="text-[#A09BD3] text-xs">Join sessions</p>
            </button>
          </div>

          {/* Daily Goal Progress - NEW */}
          <div className="bg-gradient-to-r from-[#6149E9]/10 to-[#A09BD3]/10 border border-[#6149E9]/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Daily Streak</h3>
                  <p className="text-[#A09BD3] text-sm">{streak} days and counting!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-3xl">{todayGoal.current}/{todayGoal.total}</p>
                <p className="text-[#A09BD3] text-xs">connections today</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-3 bg-[#1B1C31] rounded-full overflow-hidden mb-3">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6149E9] to-[#A09BD3] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(todayGoal.current / todayGoal.total) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <p className="text-[#A09BD3] text-sm">
              {todayGoal.current >= todayGoal.total ? (
                <span className="text-green-400 font-semibold">🎉 Goal achieved! You're on fire!</span>
              ) : (
                `${todayGoal.total - todayGoal.current} more to reach your daily goal!`
              )}
            </p>
          </div>

          {/* Recent Activity Feed - NEW */}
          <div className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              <button className="text-[#6149E9] text-sm font-medium hover:text-[#7c5ef0] transition-colors">
                View all →
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-3 bg-[#2A2B45]/50 rounded-xl hover:bg-[#2A2B45] transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{activity.name}</p>
                    <p className="text-[#A09BD3] text-xs">{activity.time}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#6149E9] text-sm">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Overview - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div 
              onClick={() => setShowSwipeMode(true)}
              className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6 hover:border-[#6149E9]/30 transition-all duration-300 hover:scale-105 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-2 right-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6149E9] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6149E9]"></span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6149E9]/20 rounded-xl flex items-center justify-center group-hover:bg-[#6149E9]/30 transition-colors duration-300">
                  <Users size={24} className="text-[#6149E9] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm font-medium">Waiting for You</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-white text-2xl font-bold">{candidates.length}</p>
                    <span className="text-[#6149E9] text-xs font-semibold">students</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#A09BD3]/10">
                <p className="text-[#A09BD3]/70 text-xs group-hover:text-[#6149E9] transition-colors">Click to start matching →</p>
              </div>
            </div>

            <div className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 hover:scale-105 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                  <TrendingUp size={24} className="text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm font-medium">Match Quality</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-white text-2xl font-bold">85%</p>
                    <span className="text-green-400 text-xs font-semibold">excellent!</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#A09BD3]/10">
                <p className="text-[#A09BD3]/70 text-xs">Based on your profile</p>
              </div>
            </div>

            <div className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors duration-300">
                  <Sparkles size={24} className="text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm font-medium">Online Now</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-white text-2xl font-bold">24</p>
                    <span className="text-yellow-400 text-xs font-semibold">active</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#A09BD3]/10">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-[#A09BD3]/70 text-xs">Available right now</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section - Enhanced */}
          <div className="bg-gradient-to-br from-[#1B1C31]/80 to-[#2A2B45]/50 border border-[#A09BD3]/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-xl flex items-center justify-center">
                <Sparkles className="text-yellow-400 w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Your Personalized Action Plan</h3>
            </div>
            
            <ul className="space-y-3">
              <li 
                onClick={() => setShowSwipeMode(true)}
                className="flex items-start gap-3 p-4 bg-[#2A2B45]/80 rounded-xl hover:bg-[#2A2B45] transition-all duration-300 border border-transparent hover:border-red-500/20 group cursor-pointer transform hover:scale-[1.02]"
              >
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors duration-300 group-hover:rotate-6">
                  <BookOpen className="text-red-400 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">Calculus II needs attention</p>
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full animate-pulse">High Priority</span>
                  </div>
                  <p className="text-[#A09BD3] text-sm leading-relaxed">
                    This is your toughest course right now. We found <span className="text-white font-semibold">3 mentors</span> who aced it and are ready to help you! 
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button className="text-[#6149E9] text-sm font-medium hover:text-[#7c5ef0] transition-colors flex items-center gap-1">
                      Find a math mentor 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </li>
              
              <li className="flex items-start gap-3 p-4 bg-[#2A2B45]/80 rounded-xl hover:bg-[#2A2B45] transition-all duration-300 border border-transparent hover:border-blue-500/20 group cursor-pointer transform hover:scale-[1.02]">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors duration-300 group-hover:-rotate-6">
                  <Users className="text-blue-400 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">Join a study squad</p>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                      5 available
                    </span>
                  </div>
                  <p className="text-[#A09BD3] text-sm leading-relaxed">
                    Students in your same courses are forming study groups. Team up and learn together!
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button className="text-[#6149E9] text-sm font-medium hover:text-[#7c5ef0] transition-colors flex items-center gap-1">
                      Browse groups 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <span className="text-[#A09BD3]/50 text-xs">·</span>
                    <span className="text-[#A09BD3] text-xs">12 students active now</span>
                  </div>
                </div>
              </li>
              
              <li className="flex items-start gap-3 p-4 bg-[#2A2B45]/80 rounded-xl hover:bg-[#2A2B45] transition-all duration-300 border border-transparent hover:border-green-500/20 group cursor-pointer">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors duration-300">
                  <Award className="text-green-400 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold">Get career insights</p>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">New</span>
                  </div>
                  <p className="text-[#A09BD3] text-sm leading-relaxed">
                    Connect with seniors who've landed internships at top companies. Level up your career game! 🚀
                  </p>
                  <button className="text-[#6149E9] text-sm font-medium mt-2 hover:text-[#7c5ef0] transition-colors">
                    Meet career mentors →
                  </button>
                </div>
              </li>
            </ul>

            {/* Quick tip at bottom */}
            <div className="mt-6 pt-4 border-t border-[#A09BD3]/10">
              <div className="flex items-start gap-2">
                <Clock className="text-[#A09BD3] w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-[#A09BD3]/70 text-xs">
                  <span className="text-white font-semibold">Pro tip:</span> Students who connect with mentors in their first week improve their grades by an average of 15%
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
      <div className="min-h-screen">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowSwipeMode(false)}
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center">
                <Target size={24} className="text-white" />
              </div>
              Discover Matches
            </h1>
            <p className="text-[#A09BD3] text-lg mt-2 ml-1">
              Swipe right to connect, left to pass
            </p>
          </div>

          {/* Quick Stats Cards */}
          <div className="flex gap-4">
            <div className="bg-[#1B1C31]/50 backdrop-blur-sm border border-[#A09BD3]/10 rounded-xl px-6 py-4 text-center">
              <div className="text-[#6149E9] font-bold text-2xl">{stats.swipesToday}</div>
              <p className="text-[#A09BD3] text-xs font-medium">Today</p>
            </div>
            <div className="bg-[#1B1C31]/50 backdrop-blur-sm border border-[#A09BD3]/10 rounded-xl px-6 py-4 text-center">
              <div className="text-[#6149E9] font-bold text-2xl">{stats.matchesThisWeek}</div>
              <p className="text-[#A09BD3] text-xs font-medium">Matches</p>
            </div>
            <div className="bg-[#1B1C31]/50 backdrop-blur-sm border border-[#A09BD3]/10 rounded-xl px-6 py-4 text-center">
              <div className="text-[#6149E9] font-bold text-2xl">{stats.profileViews}</div>
              <p className="text-[#A09BD3] text-xs font-medium">Views</p>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-[#1B1C31]/50 backdrop-blur-sm border border-[#A09BD3]/10 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white text-sm font-medium">
              Candidate {currentIndex + 1} of {candidates.length}
            </span>
            <span className="text-[#6149E9] font-bold text-lg">
              {Math.round(((currentIndex + 1) / candidates.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#2A2B45] rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#6149E9] to-[#A09BD3] h-3 rounded-full transition-all duration-500 shadow-lg shadow-[#6149E9]/50"
              style={{ width: `${((currentIndex + 1) / candidates.length) * 100}%` }}
            ></div>
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
          <div className="inline-block bg-[#1B1C31]/50 backdrop-blur-sm border border-[#A09BD3]/10 rounded-xl px-6 py-4">
            <p className="text-white text-sm font-medium">
              💡 <span className="text-[#A09BD3]">
                {candidates[currentIndex].matchType === "MENTOR" 
                  ? "Great opportunity to learn from someone experienced!"
                  : candidates[currentIndex].matchType === "PEER"
                  ? "Perfect for collaborative learning and mutual support!"
                  : "Excellent for career guidance and networking!"
                }
              </span>
            </p>
          </div>
        </div>
        </div>
      </div>
    </PageTransition>
  )
}
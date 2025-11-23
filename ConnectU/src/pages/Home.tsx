"use client"

import { useState, useEffect } from "react"
import SwipeCard from "../components/SwipeCard"
import Button from "../components/Button"
import RiskCard from "../components/RiskCard"
import PageTransition from "../components/PageTransition"
import { useNavigate } from "react-router-dom"
import { Target, Users, TrendingUp } from "lucide-react"
import { useAuthStore } from "../store/authStore"

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
  const [candidates] = useState<Candidate[]>([
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
      // Simular API call
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (err) {
      console.error("Failed to fetch candidates:", err)
      setLoading(false)
    }
  }

  const handleSwipe = async (direction: "left" | "right") => {
    const candidate = candidates[currentIndex]

    if (direction === "right") {
      try {
        // Simular match exitoso
        console.log("Matched with:", candidate.name)
        // await matchesApi.requestMatch(candidate.id, candidate.matchType)
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
    return (
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.firstName || 'Student'}! 👋
            </h1>
            <p className="text-[#A09BD3] text-lg">
              Here's your academic overview and recommendations
            </p>
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

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#6149E9]/10 to-[#A09BD3]/10 border border-[#6149E9]/30 rounded-2xl p-8 mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-2xl flex items-center justify-center">
                <Users size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Find Your Perfect Mentor</h2>
            <p className="text-[#A09BD3] mb-6 max-w-2xl mx-auto">
              Based on your academic risk and interests, we've found mentors who can help you succeed. 
              Start swiping to connect with students who match your needs!
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowSwipeMode(true)}
              className="gap-2"
            >
              <Users size={20} />
              Start Matching
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6149E9]/20 rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-[#6149E9]" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm">Potential Matches</p>
                  <p className="text-white text-2xl font-bold">{candidates.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm">Compatibility</p>
                  <p className="text-white text-2xl font-bold">85%</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Target size={24} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-[#A09BD3] text-sm">Active Mentors</p>
                  <p className="text-white text-2xl font-bold">24</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-[#1B1C31]/80 border border-[#A09BD3]/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">💡 Recommendations for You</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-4 bg-[#2A2B45] rounded-lg">
                <div className="w-2 h-2 bg-[#6149E9] rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-semibold">Focus on Calculus II</p>
                  <p className="text-[#A09BD3] text-sm">Your highest risk course. Consider finding a mentor who excels in mathematics.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 bg-[#2A2B45] rounded-lg">
                <div className="w-2 h-2 bg-[#6149E9] rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-semibold">Study Groups Available</p>
                  <p className="text-[#A09BD3] text-sm">Join collaborative sessions with peers in your same courses.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 bg-[#2A2B45] rounded-lg">
                <div className="w-2 h-2 bg-[#6149E9] rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-semibold">Career Guidance</p>
                  <p className="text-[#A09BD3] text-sm">Connect with mentors who have internship experience in your field of interest.</p>
                </div>
              </li>
            </ul>
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
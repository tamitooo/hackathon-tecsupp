"use client"

import { useState, useEffect } from "react"
import SwipeCard from "../components/SwipeCard"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { Users, Target, Star, Zap} from "lucide-react"

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

  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case "MENTOR": return <Zap className="text-yellow-500" size={16} />
      case "PEER": return <Users className="text-blue-500" size={16} />
      case "VOCATIONAL_BRIDGE": return <Target className="text-green-500" size={16} />
      default: return <Star size={16} />
    }
  }

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case "MENTOR": return "bg-yellow-500 bg-opacity-20 text-yellow-500"
      case "PEER": return "bg-blue-500 bg-opacity-20 text-blue-500"
      case "VOCATIONAL_BRIDGE": return "bg-green-500 bg-opacity-20 text-green-500"
      default: return "bg-[#6149E9] bg-opacity-20 text-[#6149E9]"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B1C31] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#A09BD3] border-t-[#6149E9] animate-spin mx-auto" />
          <p className="mt-4 text-[#A09BD3] text-lg">Finding great matches for you...</p>
        </div>
      </div>
    )
  }

  if (candidates.length === 0 || currentIndex >= candidates.length) {
    return (
      <div className="min-h-screen bg-[#1B1C31]">

        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
          <div className="w-24 h-24 bg-[#2A2B45] rounded-full flex items-center justify-center mb-6">
            <Target size={40} className="text-[#A09BD3]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Great job! 🎉</h2>
          <p className="text-[#A09BD3] text-lg mb-2">You've reviewed all potential matches</p>
          <p className="text-[#A09BD3] text-sm mb-8">Check back later for new candidates or review your matches</p>
          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Swipe Again
            </Button>
            <Button onClick={() => navigate("/matches")}>
              View My Matches
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const currentCandidate = candidates[currentIndex]

  return (
    <div className="min-h-screen bg-[#1B1C31]">

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Target size={32} className="text-[#6149E9]" />
              Find Your Match
            </h1>
            <p className="text-[#A09BD3] text-lg mt-2">
              Swipe right to connect, left to pass
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-white font-bold text-xl">{stats.swipesToday}</div>
              <p className="text-[#A09BD3] text-sm">Today</p>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-xl">{stats.matchesThisWeek}</div>
              <p className="text-[#A09BD3] text-sm">Matches</p>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-xl">{stats.profileViews}</div>
              <p className="text-[#A09BD3] text-sm">Views</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-[#2A2B45] rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#A09BD3] text-sm">
              Candidate {currentIndex + 1} of {candidates.length}
            </span>
            <span className="text-[#6149E9] font-semibold">
              {Math.round(((currentIndex + 1) / candidates.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#1B1C31] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#6149E9] to-[#A09BD3] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / candidates.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Match Type Badge */}
        <div className="flex justify-center mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getMatchTypeColor(currentCandidate.matchType)}`}>
            {getMatchTypeIcon(currentCandidate.matchType)}
            <span className="font-semibold text-sm capitalize">
              {currentCandidate.matchType.toLowerCase().replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Swipe Card */}
        <div className="max-w-md mx-auto">
          <SwipeCard 
            candidate={currentCandidate} 
            onSwipe={handleSwipe}
            additionalInfo={{
              bio: currentCandidate.bio,
              location: currentCandidate.location,
              studyStyle: currentCandidate.studyStyle,
              availability: currentCandidate.availability,
              skills: currentCandidate.skills
            }}
          />
        </div>


        {/* Tips */}
        <div className="text-center mt-8">
          <p className="text-[#A09BD3] text-sm">
            💡 Tip: {currentCandidate.matchType === "MENTOR" 
              ? "Great opportunity to learn from someone experienced!"
              : currentCandidate.matchType === "PEER"
              ? "Perfect for collaborative learning and mutual support!"
              : "Excellent for career guidance and networking!"
            }
          </p>
        </div>
      </div>
    </div>
  )
}
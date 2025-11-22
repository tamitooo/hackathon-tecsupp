"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserCard from "../components/UserCard"
import Button from "../components/Button"
import { Users, Filter, Search, MessageCircle, Star } from "lucide-react"

interface Match {
  id: string
  name: string
  avatar?: string
  career: string
  university: string
  badges: string[]
  bio?: string
  compatibility: number
  lastActive: string
  commonInterests: string[]
  online: boolean
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: "1",
      name: "Sarah Chen",
      career: "Computer Science",
      university: "UTEC",
      badges: ["Mentor", "Top Student", "Study Partner"],
      bio: "Passionate about AI and machine learning. Love helping students succeed in programming courses.",
      compatibility: 95,
      lastActive: "2 min ago",
      commonInterests: ["Programming", "AI", "Mathematics"],
      online: true
    },
    {
      id: "2",
      name: "Juan Martinez",
      career: "Engineering",
      university: "UTEC",
      badges: ["Peer Tutor", "Active Learner"],
      bio: "Engineering student specializing in renewable energy. Always ready for study sessions.",
      compatibility: 87,
      lastActive: "1 hour ago",
      commonInterests: ["Physics", "Calculus", "Engineering"],
      online: false
    },
    {
      id: "3",
      name: "Maria Garcia",
      career: "Data Science",
      university: "UTEC",
      badges: ["Data Analyst", "Helper"],
      bio: "Data science enthusiast with experience in Python and statistical analysis.",
      compatibility: 92,
      lastActive: "30 min ago",
      commonInterests: ["Data Science", "Statistics", "Python"],
      online: true
    },
    {
      id: "4",
      name: "David Kim",
      career: "Software Engineering",
      university: "UTEC",
      badges: ["Code Mentor", "Project Leader"],
      bio: "Full-stack developer passionate about web technologies and open source.",
      compatibility: 78,
      lastActive: "5 hours ago",
      commonInterests: ["Web Development", "JavaScript", "Open Source"],
      online: false
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const navigate = useNavigate()

  const handleOpenChat = (matchId: string) => {
    navigate(`/chat/${matchId}`)
  }

  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.university.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(match => {
    if (selectedFilter === "online") return match.online
    if (selectedFilter === "high-compatibility") return match.compatibility >= 90
    return true
  })

  if (filteredMatches.length === 0) {
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

        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
          <div className="w-24 h-24 bg-[#2A2B45] rounded-full flex items-center justify-center mb-6">
            <Users size={40} className="text-[#A09BD3]" />
          </div>
          <p className="text-2xl font-bold text-white mb-4">No matches found</p>
          <p className="text-[#A09BD3] text-lg mb-8 max-w-md">
            {searchTerm || selectedFilter !== "all" 
              ? "Try adjusting your search or filters to find more matches." 
              : "Start swiping to find your perfect study partners and mentors."
            }
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={() => { setSearchTerm(""); setSelectedFilter("all") }}
              variant="outline"
            >
              Clear Filters
            </Button>
            <Button onClick={() => navigate("/")}>
              Start Matching
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1B1C31]">

      {/* Matches Content */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Users size={32} className="text-[#6149E9]" />
              Your Matches
            </h1>
            <p className="text-[#A09BD3] text-lg mt-2">
              You have {filteredMatches.length} {filteredMatches.length === 1 ? 'match' : 'matches'}
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="flex items-center gap-2 text-[#6149E9]">
                <MessageCircle size={20} />
                <span className="text-white font-bold text-xl">{matches.filter(m => m.online).length}</span>
              </div>
              <p className="text-[#A09BD3] text-sm">Online</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-[#6149E9]">
                <Star size={20} />
                <span className="text-white font-bold text-xl">{matches.filter(m => m.compatibility >= 90).length}</span>
              </div>
              <p className="text-[#A09BD3] text-sm">High Match</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#2A2B45] rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A09BD3]" size={20} />
              <input
                type="text"
                placeholder="Search by name, career, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1B1C31] text-white placeholder-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] border border-[#A09BD3]"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 rounded-lg bg-[#1B1C31] text-white border border-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9]"
              >
                <option value="all">All Matches</option>
                <option value="online">Online Now</option>
                <option value="high-compatibility">High Compatibility</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#6149E9] text-white hover:bg-[#5540d6] transition-colors">
                <Filter size={20} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20 hover:border-opacity-40 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full flex items-center justify-center text-white font-bold">
                      {match.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {match.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2A2B45]"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{match.name}</h3>
                    <p className="text-[#A09BD3] text-sm">{match.career}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 bg-[#6149E9] bg-opacity-20 px-2 py-1 rounded-full">
                    <Star size={12} className="text-[#6149E9]" />
                    <span className="text-[#6149E9] text-sm font-semibold">{match.compatibility}%</span>
                  </div>
                  <p className="text-[#A09BD3] text-xs mt-1">{match.lastActive}</p>
                </div>
              </div>

              {/* University */}
              <p className="text-[#A09BD3] text-sm mb-3">{match.university}</p>

              {/* Bio */}
              <p className="text-[#A09BD3] text-sm mb-4 line-clamp-2">{match.bio}</p>

              {/* Common Interests */}
              <div className="flex flex-wrap gap-1 mb-4">
                {match.commonInterests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="bg-[#6149E9] bg-opacity-20 text-[#6149E9] px-2 py-1 rounded text-xs"
                  >
                    {interest}
                  </span>
                ))}
                {match.commonInterests.length > 3 && (
                  <span className="text-[#A09BD3] text-xs">+{match.commonInterests.length - 3} more</span>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mb-6">
                {match.badges.slice(0, 2).map((badge, index) => (
                  <span
                    key={index}
                    className="bg-[#A09BD3] bg-opacity-20 text-[#A09BD3] px-2 py-1 rounded text-xs"
                  >
                    {badge}
                  </span>
                ))}
                {match.badges.length > 2 && (
                  <span className="text-[#A09BD3] text-xs">+{match.badges.length - 2}</span>
                )}
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleOpenChat(match.id)}
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Start Chat
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
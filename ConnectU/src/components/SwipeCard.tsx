"use client"

import { User, Heart, X, Star, MapPin, BookOpen, Zap, Users, Target } from "lucide-react"

interface SwipeCardProps {
  candidate: {
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
  onSwipe: (direction: "left" | "right") => void
  additionalInfo?: {
    bio: string
    location: string
    studyStyle: string
    availability: string[]
    skills: string[]
  }
}

export default function SwipeCard({ candidate, onSwipe, additionalInfo }: SwipeCardProps) {
  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case "MENTOR": return <Zap className="text-yellow-500" size={20} />
      case "PEER": return <Users className="text-blue-500" size={20} />
      case "VOCATIONAL_BRIDGE": return <Target className="text-green-500" size={20} />
      default: return <Star size={20} />
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

  return (
    <div className="bg-[#2A2B45] rounded-2xl shadow-xl overflow-hidden border border-[#A09BD3] border-opacity-20 max-w-md w-full mx-auto">
      {/* Header with Avatar */}
      <div className="relative bg-gradient-to-br from-[#6149E9] to-[#A09BD3] h-48 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4 border-4 border-white border-opacity-30">
            {candidate.avatar ? (
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
          <p className="text-white text-opacity-90">{candidate.career}</p>
        </div>
        
        {/* Compatibility Badge */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400" />
            <span className="text-white font-bold text-sm">{candidate.compatibility}%</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* University and Location */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#A09BD3]">
            <BookOpen size={16} />
            <span>{candidate.university}</span>
          </div>
          <div className="flex items-center gap-2 text-[#A09BD3]">
            <MapPin size={16} />
            <span>{additionalInfo?.location || candidate.location}</span>
          </div>
        </div>

        {/* Match Type */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getMatchTypeColor(candidate.matchType)}`}>
          {getMatchTypeIcon(candidate.matchType)}
          <span className="font-semibold text-sm capitalize">
            {candidate.matchType.toLowerCase().replace('_', ' ')}
          </span>
        </div>

        {/* Bio */}
        <div>
          <p className="text-[#A09BD3] text-sm leading-relaxed">
            {additionalInfo?.bio || candidate.bio}
          </p>
        </div>

        {/* Skills */}
        {additionalInfo?.skills && (
          <div>
            <p className="text-white text-sm font-semibold mb-2">Skills</p>
            <div className="flex flex-wrap gap-1">
              {additionalInfo.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#6149E9] bg-opacity-20 text-[#6149E9] px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Common Interests */}
        <div>
          <p className="text-white text-sm font-semibold mb-2">Common Interests</p>
          <div className="flex flex-wrap gap-1">
            {candidate.commonInterests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="bg-[#A09BD3] bg-opacity-20 text-[#A09BD3] px-2 py-1 rounded text-xs"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        {additionalInfo?.availability && (
          <div>
            <p className="text-white text-sm font-semibold mb-2">Available</p>
            <div className="flex flex-wrap gap-1">
              {additionalInfo.availability.map((time, index) => (
                <span
                  key={index}
                  className="bg-[#2A2B45] border border-[#A09BD3] border-opacity-30 text-[#A09BD3] px-2 py-1 rounded text-xs"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Match Reasons */}
        <div>
          <p className="text-white text-sm font-semibold mb-2">Why you match</p>
          <ul className="space-y-1">
            {candidate.matchReasons.slice(0, 2).map((reason, index) => (
              <li key={index} className="text-[#A09BD3] text-sm flex items-center gap-2">
                <div className="w-1 h-1 bg-[#6149E9] rounded-full"></div>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 p-6 bg-[#1B1C31] border-t border-[#A09BD3] border-opacity-20">
        <button
          onClick={() => onSwipe("left")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-[#A09BD3] text-[#A09BD3] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300"
        >
          <X size={24} />
          <span className="font-semibold">Pass</span>
        </button>
        <button
          onClick={() => onSwipe("right")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#6149E9] text-white hover:bg-[#5540d6] transition-all duration-300 shadow-lg"
        >
          <Heart size={24} />
          <span className="font-semibold">Connect</span>
        </button>
      </div>
    </div>
  )
}
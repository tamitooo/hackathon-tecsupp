"use client"

import { User, Heart, X, Star, MapPin, BookOpen, Zap, Users, Target, Award, Clock, TrendingUp } from "lucide-react"

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
    level?: number
    experience?: number
    responseTime?: string
    subjects?: string[]
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
      case "MENTOR": return <Zap className="text-[#6149E9]" size={18} />
      case "PEER": return <Users className="text-[#6149E9]" size={18} />
      case "VOCATIONAL_BRIDGE": return <Target className="text-[#6149E9]" size={18} />
      default: return <Star size={18} />
    }
  }

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case "MENTOR": return "bg-[#6149E9] bg-opacity-20 text-[#6149E9]"
      case "PEER": return "bg-[#A09BD3] bg-opacity-20 text-[#A09BD3]"
      case "VOCATIONAL_BRIDGE": return "bg-[#6149E9] bg-opacity-20 text-[#6149E9]"
      default: return "bg-[#6149E9] bg-opacity-20 text-[#6149E9]"
    }
  }

  const getMatchTypeText = (type: string) => {
    switch (type) {
      case "MENTOR": return "Mentor"
      case "PEER": return "Compañero"
      case "VOCATIONAL_BRIDGE": return "Guía Vocacional"
      default: return type
    }
  }

  const getLevelColor = (level: number = 1) => {
    if (level >= 4) return "from-purple-500 to-pink-500"
    if (level >= 3) return "from-blue-500 to-purple-500"
    if (level >= 2) return "from-green-500 to-blue-500"
    return "from-[#6149E9] to-[#A09BD3]"
  }

  const getLevelText = (level: number = 1) => {
    if (level >= 4) return "Experto"
    if (level >= 3) return "Avanzado"
    if (level >= 2) return "Intermedio"
    return "Principiante"
  }

  return (
    <div className="bg-[#2A2B45] rounded-2xl shadow-xl overflow-hidden border border-[#A09BD3] border-opacity-20 max-w-md w-full mx-auto transform transition-transform duration-300 hover:shadow-2xl hover:shadow-[#6149E9]/10">
      {/* Header with Gradient Background */}
      <div className="relative bg-gradient-to-br from-[#6149E9] to-[#A09BD3] h-40 p-6">
        {/* Level Badge */}
        <div className="absolute top-4 left-4">
          <div className={`bg-gradient-to-r ${getLevelColor(candidate.level)} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
            <Award size={12} />
            Nvl {candidate.level || 1}
          </div>
        </div>

        {/* Compatibility Badge */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400" />
            <span className="text-white font-bold text-sm">{candidate.compatibility}%</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 mt-8">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-4 border-white border-opacity-30">
            {candidate.avatar ? (
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={28} className="text-white" />
            )}
          </div>
          <div className="text-white">
            <h2 className="text-xl font-bold">{candidate.name}</h2>
            <p className="text-white text-opacity-90 text-sm">{candidate.career}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* University and Experience */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#A09BD3]">
            <BookOpen size={16} />
            <span>{candidate.university}</span>
          </div>
          {candidate.experience && (
            <div className="flex items-center gap-2 text-[#A09BD3] text-xs">
              <TrendingUp size={14} />
              <span>{candidate.experience} hrs exp</span>
            </div>
          )}
        </div>

        {/* Location and Response Time */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-[#A09BD3]">
            <MapPin size={16} />
            <span>{additionalInfo?.location || candidate.location}</span>
          </div>
          {candidate.responseTime && (
            <div className="flex items-center gap-2 text-[#A09BD3] text-xs">
              <Clock size={14} />
              <span>{candidate.responseTime}</span>
            </div>
          )}
        </div>

        {/* Match Type and Level Progress */}
        <div className="space-y-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getMatchTypeColor(candidate.matchType)}`}>
            {getMatchTypeIcon(candidate.matchType)}
            <span className="font-semibold text-sm">
              {getMatchTypeText(candidate.matchType)} • {getLevelText(candidate.level)}
            </span>
          </div>

          {/* Level Progress Bar */}
          <div className="bg-[#1B1C31] rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getLevelColor(candidate.level)}`}
              style={{ width: `${((candidate.experience || 0) % 100)}%` }}
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="text-[#A09BD3] text-sm leading-relaxed">
            {additionalInfo?.bio || candidate.bio}
          </p>
        </div>

        {/* Subjects/Skills */}
        {(additionalInfo?.skills || candidate.subjects) && (
          <div>
            <p className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
              <BookOpen size={16} />
              {candidate.matchType === "MENTOR" ? "Materias que domina" : "Habilidades"}
            </p>
            <div className="flex flex-wrap gap-1">
              {(candidate.subjects || additionalInfo?.skills || []).slice(0, 4).map((item, index) => (
                <span
                  key={index}
                  className="bg-[#6149E9] bg-opacity-20 text-[#6149E9] px-2 py-1 rounded text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Common Interests */}
        <div>
          <p className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
            <Users size={16} />
            Intereses en común
          </p>
          <div className="flex flex-wrap gap-1">
            {candidate.commonInterests.slice(0, 4).map((interest, index) => (
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
            <p className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
              <Clock size={16} />
              Disponibilidad
            </p>
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

        {/* Study Style */}
        {additionalInfo?.studyStyle && (
          <div>
            <p className="text-white text-sm font-semibold mb-2">Estilo de estudio</p>
            <span className="bg-[#2A2B45] border border-[#6149E9] border-opacity-30 text-[#6149E9] px-3 py-1 rounded-full text-xs font-medium">
              {additionalInfo.studyStyle}
            </span>
          </div>
        )}

        {/* Match Reasons */}
        <div className="bg-[#1B1C31] rounded-lg p-3 border border-[#6149E9] border-opacity-20">
          <p className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
            <Target size={16} />
            Por qué hacen match
          </p>
          <ul className="space-y-2">
            {candidate.matchReasons.slice(0, 3).map((reason, index) => (
              <li key={index} className="text-[#A09BD3] text-sm flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#6149E9] rounded-full mt-1.5 flex-shrink-0"></div>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 p-6 bg-[#1B1C31] border-t border-[#A09BD3] border-opacity-20">
        <button
          onClick={() => onSwipe("left")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-[#A09BD3] text-[#A09BD3] hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
          <span className="font-semibold">Pasar</span>
        </button>
        <button
          onClick={() => onSwipe("right")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#6149E9] text-white hover:bg-[#5540d6] transition-all duration-300 shadow-lg transform hover:scale-105 group"
        >
          <Heart size={24} className="group-hover:scale-110 transition-transform" />
          <span className="font-semibold">Conectar</span>
        </button>
      </div>
    </div>
  )
}
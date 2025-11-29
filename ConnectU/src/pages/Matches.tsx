"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import PageTransition from "../components/PageTransition"
import { Users, Search, MessageCircle, Star, Target, Zap, Award, Clock, BookOpen } from "lucide-react"

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
  level: number
  experience: number
  mentorshipStyle: string[]
  responseTime: string
  subjects: string[]
  matchType: "MENTOR" | "PEER" | "VOCATIONAL_BRIDGE"
}

export default function Matches() {
  const [matches] = useState<Match[]>([
    {
      id: "1",
      name: "Sarah Chen",
      career: "Computer Science",
      university: "UTEC",
      badges: ["Top Mentor", "Math Expert", "Study Partner"],
      bio: "Apasionada por IA y machine learning. Me encanta ayudar a estudiantes a tener éxito en cursos de programación.",
      compatibility: 95,
      lastActive: "Hace 2 min",
      commonInterests: ["Programación", "IA", "Matemáticas", "Algoritmos"],
      online: true,
      level: 4,
      experience: 320,
      mentorshipStyle: ["Estructurado", "Práctico", "Paciente"],
      responseTime: "< 5 min",
      subjects: ["Cálculo II", "Programación", "Álgebra Lineal"],
      matchType: "MENTOR"
    },
    {
      id: "2",
      name: "Juan Martinez",
      career: "Engineering",
      university: "UTEC",
      badges: ["Tutor Par", "Aprendiz Activo"],
      bio: "Estudiante de ingeniería especializado en energía renovable. Siempre listo para sesiones de estudio.",
      compatibility: 87,
      lastActive: "Hace 1 hora",
      commonInterests: ["Física", "Cálculo", "Ingeniería", "Sostenibilidad"],
      online: false,
      level: 2,
      experience: 120,
      mentorshipStyle: ["Colaborativo", "Hands-on"],
      responseTime: "1-2 horas",
      subjects: ["Física I", "Cálculo I", "Química"],
      matchType: "PEER"
    },
    {
      id: "3",
      name: "Maria Garcia",
      career: "Data Science",
      university: "UTEC",
      badges: ["Analista de Datos", "Helper"],
      bio: "Entusiasta de data science con experiencia en Python y análisis estadístico.",
      compatibility: 92,
      lastActive: "Hace 30 min",
      commonInterests: ["Data Science", "Estadística", "Python", "ML"],
      online: true,
      level: 3,
      experience: 210,
      mentorshipStyle: ["Analítico", "Basado en proyectos"],
      responseTime: "< 15 min",
      subjects: ["Estadística", "Python", "Machine Learning"],
      matchType: "VOCATIONAL_BRIDGE"
    },
    {
      id: "4",
      name: "David Kim",
      career: "Software Engineering",
      university: "UTEC",
      badges: ["Mentor Code", "Líder Proyectos"],
      bio: "Desarrollador full-stack apasionado por tecnologías web y open source.",
      compatibility: 78,
      lastActive: "Hace 5 horas",
      commonInterests: ["Web Development", "JavaScript", "Open Source"],
      online: false,
      level: 3,
      experience: 180,
      mentorshipStyle: ["Técnico", "Innovador"],
      responseTime: "2-3 horas",
      subjects: ["JavaScript", "React", "Node.js"],
      matchType: "MENTOR"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("compatibility")
  const navigate = useNavigate()

  const handleOpenChat = (matchId: string) => {
    navigate(`/chat/${matchId}`)
  }

  const getLevelColor = (level: number) => {
    if (level >= 4) return "from-purple-500 to-pink-500"
    if (level >= 3) return "from-blue-500 to-purple-500"
    if (level >= 2) return "from-green-500 to-blue-500"
    return "from-gray-500 to-green-500"
  }

  const getLevelBadge = (level: number) => {
    if (level >= 4) return { text: "Experto", color: "bg-purple-500" }
    if (level >= 3) return { text: "Avanzado", color: "bg-blue-500" }
    if (level >= 2) return { text: "Intermedio", color: "bg-green-500" }
    return { text: "Principiante", color: "bg-gray-500" }
  }

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case "MENTOR": return "bg-blue-500/20 text-blue-400"
      case "PEER": return "bg-green-500/20 text-green-400"
      case "VOCATIONAL_BRIDGE": return "bg-purple-500/20 text-purple-400"
      default: return "bg-gray-500/20 text-gray-400"
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

  const filteredMatches = matches
    .filter(match =>
      match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(match => {
      if (selectedFilter === "online") return match.online
      if (selectedFilter === "high-compatibility") return match.compatibility >= 90
      if (selectedFilter === "mentors") return match.matchType === "MENTOR"
      if (selectedFilter === "peers") return match.matchType === "PEER"
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "compatibility": return b.compatibility - a.compatibility
        case "level": return b.level - a.level
        case "experience": return b.experience - a.experience
        case "response": 
          const timeA = parseInt(a.responseTime) || 999
          const timeB = parseInt(b.responseTime) || 999
          return timeA - timeB
        default: return 0
      }
    })

  if (filteredMatches.length === 0) {
    return (
      <div className="min-h-screen bg-[#1B1C31]">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
          <div className="w-24 h-24 bg-[#2A2B45] rounded-full flex items-center justify-center mb-6">
            <Users size={40} className="text-[#A09BD3]" />
          </div>
          <p className="text-2xl font-bold text-white mb-4">No se encontraron matches</p>
          <p className="text-[#A09BD3] text-lg mb-8 max-w-md">
            {searchTerm || selectedFilter !== "all" 
              ? "Intenta ajustar tu búsqueda o filtros para encontrar más matches." 
              : "Comienza a hacer matching para encontrar tus compañeros de estudio y mentores perfectos."
            }
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={() => { setSearchTerm(""); setSelectedFilter("all") }}
              variant="outline"
            >
              Limpiar Filtros
            </Button>
            <Button onClick={() => navigate("/")}>
              Comenzar Matching
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1B1C31] px-6 py-8">
        {/* Header con Stats Mejorado */}
        
          <div className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Tus Matches</h1>
                    <p className="text-[#A09BD3] text-lg">
                      Tienes {filteredMatches.length} {filteredMatches.length === 1 ? 'match' : 'matches'} conectados
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Mejorados */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-[#6149E9] mb-2">
                    <Zap size={20} />
                    <span className="text-white font-bold text-xl">{matches.filter(m => m.online).length}</span>
                  </div>
                  <p className="text-[#A09BD3] text-sm">En línea</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-[#6149E9] mb-2">
                    <Target size={20} />
                    <span className="text-white font-bold text-xl">{matches.filter(m => m.compatibility >= 90).length}</span>
                  </div>
                  <p className="text-[#A09BD3] text-sm">Alta compatibilidad</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-[#6149E9] mb-2">
                    <Award size={20} />
                    <span className="text-white font-bold text-xl">{matches.filter(m => m.level >= 3).length}</span>
                  </div>
                  <p className="text-[#A09BD3] text-sm">Avanzados</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-[#6149E9] mb-2">
                    <Clock size={20} />
                    <span className="text-white font-bold text-xl">{matches.filter(m => m.responseTime.includes("<")).length}</span>
                  </div>
                  <p className="text-[#A09BD3] text-sm">Respuesta rápida</p>
                </div>
              </div>
            </div>

            {/* Search and Filters Mejorado */}
            <div className="bg-[#1B1C31] rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A09BD3]" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, carrera, universidad o materias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2A2B45] text-white placeholder-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] border border-[#A09BD3]/20"
                  />
                </div>

                {/* Filtros y Orden */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2A2B45] text-white border border-[#A09BD3]/20 focus:outline-none focus:ring-2 focus:ring-[#6149E9]"
                  >
                    <option value="all">Todos los matches</option>
                    <option value="online">En línea ahora</option>
                    <option value="high-compatibility">Alta compatibilidad (90%+)</option>
                    <option value="mentors">Solo mentores</option>
                    <option value="peers">Solo compañeros</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-[#2A2B45] text-white border border-[#A09BD3]/20 focus:outline-none focus:ring-2 focus:ring-[#6149E9]"
                  >
                    <option value="compatibility">Ordenar por compatibilidad</option>
                    <option value="level">Ordenar por nivel</option>
                    <option value="experience">Ordenar por experiencia</option>
                    <option value="response">Ordenar por respuesta</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        

        {/* Matches Grid Mejorado */}
        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMatches.map((match) => {
              const levelBadge = getLevelBadge(match.level)
              const levelColor = getLevelColor(match.level)
              
              return (
                <div
                  key={match.id}
                  className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20 hover:border-[#6149E9]/50 transition-all duration-300 hover:transform hover:scale-[1.02] group"
                >
                  {/* Header con Nivel y Tipo */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-12 h-12 bg-gradient-to-br ${levelColor} rounded-full flex items-center justify-center text-white font-bold`}>
                          {match.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {match.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2A2B45] animate-pulse"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg group-hover:text-[#6149E9] transition-colors">
                          {match.name}
                        </h3>
                        <p className="text-[#A09BD3] text-sm">{match.career}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-1 bg-[#6149E9] bg-opacity-20 px-2 py-1 rounded-full">
                        <Star size={12} className="text-[#6149E9]" />
                        <span className="text-[#6149E9] text-sm font-semibold">{match.compatibility}%</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${levelBadge.color} text-white`}>
                        Nvl {match.level}
                      </span>
                    </div>
                  </div>

                  {/* Información de Nivel y Experiencia */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getMatchTypeColor(match.matchType)}`}>
                      {getMatchTypeText(match.matchType)}
                    </span>
                    <div className="flex items-center gap-2 text-[#A09BD3] text-xs">
                      <BookOpen size={12} />
                      {match.experience} hrs exp
                    </div>
                  </div>

                  {/* Barra de Progreso de Nivel */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-[#A09BD3] mb-1">
                      <span>Nivel {match.level} - {levelBadge.text}</span>
                      <span>{match.experience} XP</span>
                    </div>
                    <div className="w-full bg-[#1B1C31] rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${levelColor}`}
                        style={{ width: `${(match.experience % 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Universidad y Tiempo de Respuesta */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[#A09BD3] text-sm">{match.university}</p>
                    <div className="flex items-center gap-1 text-[#A09BD3] text-xs">
                      <Clock size={12} />
                      {match.responseTime}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-[#A09BD3] text-sm mb-4 line-clamp-2">{match.bio}</p>

                  {/* Materias que Domina */}
                  <div className="mb-4">
                    <p className="text-white text-xs font-medium mb-2">Domina:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="bg-[#6149E9] bg-opacity-20 text-[#6149E9] px-2 py-1 rounded text-xs"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Intereses Comunes */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {match.commonInterests.slice(0, 3).map((interest, index) => (
                      <span
                        key={index}
                        className="bg-[#A09BD3] bg-opacity-20 text-[#A09BD3] px-2 py-1 rounded text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  {/* Estilo de Mentoría */}
                  <div className="mb-6">
                    <p className="text-white text-xs font-medium mb-2">Estilo:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.mentorshipStyle.slice(0, 2).map((style, index) => (
                        <span
                          key={index}
                          className="bg-[#2A2B45] text-[#A09BD3] px-2 py-1 rounded text-xs border border-[#A09BD3]/20"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleOpenChat(match.id)}
                    className="w-full flex items-center justify-center gap-2 group-hover:bg-[#5540d6] transition-colors"
                  >
                    <MessageCircle size={18} />
                    {match.online ? "Chatear ahora" : "Enviar mensaje"}
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
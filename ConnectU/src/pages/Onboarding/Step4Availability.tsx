"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import Button from "../../components/Button"
import Stepper from "../../components/Stepper"
import PageTransition from "../../components/PageTransition"
import { Calendar, Check, X, ChevronLeft, ChevronRight } from "lucide-react"

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const FULL_DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
const HOURS = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 7 // Desde 7:00 AM hasta 11:00 PM
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour
  return {
    time24: `${hour.toString().padStart(2, "0")}:00`,
    time12: `${displayHour}:00 ${period}`,
    hour: hour
  }
})

export default function Step4Availability() {
  const [availability, setAvailability] = useState<Record<string, boolean[]>>(
    DAYS.reduce((acc, day) => ({ ...acc, [day]: Array(17).fill(false) }), {}),
  )
  const [loading, setLoading] = useState(false)
  const [selectedMode, setSelectedMode] = useState<"click" | "drag">("click")
  const [isDragging, setIsDragging] = useState(false)
  const [dragValue, setDragValue] = useState(false)
  const navigate = useNavigate()
  const { setOnboardingCompleted, setUser, email } = useAuthStore()

  // Calcular estadísticas
  const stats = useMemo(() => {
    const totalSlots = DAYS.length * HOURS.length
    const selectedSlots = Object.values(availability).flat().filter(Boolean).length
    const percentage = Math.round((selectedSlots / totalSlots) * 100)
    
    return { totalSlots, selectedSlots, percentage }
  }, [availability])

  const toggleHour = (day: string, hourIndex: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((val, i) => (i === hourIndex ? !val : val)),
    }))
  }

  const handleMouseDown = (day: string, hourIndex: number) => {
    if (selectedMode === "drag") {
      setIsDragging(true)
      const newValue = !availability[day][hourIndex]
      setDragValue(newValue)
      toggleHour(day, hourIndex)
    } else {
      toggleHour(day, hourIndex)
    }
  }

  const handleMouseEnter = (day: string, hourIndex: number) => {
    if (isDragging && selectedMode === "drag") {
      setAvailability((prev) => ({
        ...prev,
        [day]: prev[day].map((val, i) => (i === hourIndex ? dragValue : val)),
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const clearAll = () => {
    setAvailability(DAYS.reduce((acc, day) => ({ ...acc, [day]: Array(17).fill(false) }), {}))
  }

  const selectAll = () => {
    setAvailability(DAYS.reduce((acc, day) => ({ ...acc, [day]: Array(17).fill(true) }), {}))
  }

  const selectWeekdays = () => {
    setAvailability(prev => {
      const newAvailability = { ...prev }
      DAYS.forEach((day, index) => {
        if (index < 5) { // Lunes a Viernes
          newAvailability[day] = Array(17).fill(true)
        } else {
          newAvailability[day] = Array(17).fill(false)
        }
      })
      return newAvailability
    })
  }

  const selectWeekends = () => {
    setAvailability(prev => {
      const newAvailability = { ...prev }
      DAYS.forEach((day, index) => {
        if (index >= 5) { // Sábado y Domingo
          newAvailability[day] = Array(17).fill(true)
        } else {
          newAvailability[day] = Array(17).fill(false)
        }
      })
      return newAvailability
    })
  }

  // CORREGIDO: Funciones de selección por horario
  const selectMorning = () => {
    setAvailability(prev => {
      const newAvailability = { ...prev }
      DAYS.forEach(day => {
        newAvailability[day] = Array(17).fill(false).map((_, index) => index < 6) // 7AM - 12PM
      })
      return newAvailability
    })
  }

  const selectAfternoon = () => {
    setAvailability(prev => {
      const newAvailability = { ...prev }
      DAYS.forEach(day => {
        newAvailability[day] = Array(17).fill(false).map((_, index) => index >= 6 && index < 12) // 1PM - 6PM
      })
      return newAvailability
    })
  }

  const selectEvening = () => {
    setAvailability(prev => {
      const newAvailability = { ...prev }
      DAYS.forEach(day => {
        newAvailability[day] = Array(17).fill(false).map((_, index) => index >= 12) // 7PM - 11PM
      })
      return newAvailability
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const onboarding = JSON.parse(sessionStorage.getItem("onboarding") || "{}")

      // Crear usuario con la estructura correcta según tu interface User
      const mockUser = {
        id: Date.now().toString(),
        email: email || onboarding.email || "user@universidad.edu.pe",
        firstName: onboarding.firstName || "",
        lastName: onboarding.lastName || "",
        university: onboarding.university || "",
        career: onboarding.career || "",
        semester: parseInt(onboarding.semester) || 1,
        bio: `Interests: ${onboarding.careerInterests || ''}. Goals: ${onboarding.futureRoles || ''}`
      }

      setUser(mockUser)
      setOnboardingCompleted(true)
      sessionStorage.removeItem("onboarding")
      navigate("/")
    } catch (err) {
      console.error("Onboarding failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1B1C31]">
        {/* Navbar */}
        <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/LOGOCONECTU.png" 
                alt="ConnectU Logo" 
                className="h-8 w-auto"
              />
              <span className="font-poppins text-white font-extralight text-xl">
                ConectU
              </span>
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="flex items-center justify-center p-4 sm:p-8 min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-7xl bg-[#1B1C31] text-white">
            {/* Progress Steps - Centrado */}
            <div className="flex justify-center mb-8">
              <Stepper currentStep={4} totalSteps={4} />
            </div>

            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center">
                    <Calendar className="text-white w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Tu Disponibilidad Semanal</h2>
                </div>
                <p className="text-[#A09BD3] text-lg">Paso 4 de 4: Selecciona tus horarios disponibles</p>
                <p className="text-[#6149E9] text-sm mt-2">
                  Horario: 7:00 AM - 11:00 PM • Haz clic o arrastra para seleccionar
                </p>
              </div>

              {/* Controls */}
              <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-semibold">Modo de selección:</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMode("click")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedMode === "click"
                            ? "bg-[#6149E9] text-white"
                            : "bg-[#1B1C31] text-[#A09BD3] hover:bg-[#2A2B45]"
                        }`}
                      >
                        Clic Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMode("drag")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedMode === "drag"
                            ? "bg-[#6149E9] text-white"
                            : "bg-[#1B1C31] text-[#A09BD3] hover:bg-[#2A2B45]"
                        }`}
                      >
                        Arrastrar
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      type="button"
                      onClick={selectMorning}
                      className="px-3 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                    >
                      Mañanas
                    </button>
                    <button
                      type="button"
                      onClick={selectAfternoon}
                      className="px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                    >
                      Tardes
                    </button>
                    <button
                      type="button"
                      onClick={selectEvening}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                    >
                      Noches
                    </button>
                    <button
                      type="button"
                      onClick={selectWeekdays}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Lunes-Viernes
                    </button>
                    <button
                      type="button"
                      onClick={selectWeekends}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Fin de semana
                    </button>
                    <button
                      type="button"
                      onClick={selectAll}
                      className="px-3 py-2 bg-[#6149E9] text-white rounded-lg text-sm font-medium hover:bg-[#5540d6] transition-colors"
                    >
                      Todo
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Limpiar
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Calendar Grid - Estilo Columnas */}
                <div 
                  className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-6 overflow-x-auto"
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div className="min-w-[900px]">
                    {/* Header con días */}
                    <div className="grid grid-cols-8 gap-2 mb-4">
                      {/* Celda vacía para la columna de horas */}
                      <div className="h-12"></div>
                      
                      {/* Headers de días */}
                      {DAYS.map((day, index) => (
                        <div
                          key={day}
                          className="flex flex-col items-center justify-center p-3 bg-[#1B1C31] rounded-lg border border-[#A09BD3]/20"
                        >
                          <div className="text-white font-bold text-lg">{day}</div>
                          <div className="text-[#A09BD3] text-xs">{FULL_DAYS[index]}</div>
                        </div>
                      ))}
                    </div>

                    {/* Grid de horas y disponibilidad */}
                    <div className="space-y-1">
                      {HOURS.map((hourObj, hourIndex) => (
                        <div key={hourIndex} className="grid grid-cols-8 gap-2">
                          {/* Columna de horas */}
                          <div className="flex items-center justify-center p-2 bg-[#1B1C31] rounded-lg border border-[#A09BD3]/20">
                            <div className="text-center">
                              <div className="text-white font-semibold text-sm">{hourObj.time12}</div>
                              <div className="text-[#A09BD3] text-xs">{hourObj.time24}</div>
                            </div>
                          </div>
                          
                          {/* Celdas de disponibilidad para cada día */}
                          {DAYS.map((day) => (
                            <button
                              key={`${day}-${hourIndex}`}
                              type="button"
                              onMouseDown={() => handleMouseDown(day, hourIndex)}
                              onMouseEnter={() => handleMouseEnter(day, hourIndex)}
                              className={`
                                h-12 rounded-lg transition-all duration-150 border-2 flex items-center justify-center
                                ${availability[day][hourIndex]
                                  ? "bg-[#6149E9] border-[#6149E9] hover:bg-[#5540d6] text-white"
                                  : "bg-[#1B1C31] border-[#2A2B45] hover:bg-[#2A2B45] hover:border-[#6149E9] text-[#A09BD3]"
                                }
                                ${isDragging && selectedMode === "drag" ? "cursor-grabbing" : "cursor-pointer"}
                              `}
                            >
                              {availability[day][hourIndex] && (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="bg-[#2A2B45] border border-[#A09BD3]/20 rounded-2xl p-4">
                  <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#1B1C31] border-2 border-[#2A2B45] rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#2A2B45] rounded"></div>
                      </div>
                      <span className="text-[#A09BD3]">No disponible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#6149E9] border-2 border-[#6149E9] rounded flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white">Disponible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#1B1C31] border-2 border-[#6149E9] rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#6149E9] rounded"></div>
                      </div>
                      <span className="text-[#A09BD3]">Hover</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/onboarding/step3")}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </div>
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="flex-1" 
                    disabled={loading || stats.selectedSlots === 0}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Completando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-center">
                        <Check className="w-4 h-4" />
                        Completar Configuración
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
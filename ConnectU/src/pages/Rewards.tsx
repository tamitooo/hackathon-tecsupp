import { useGamificationStore } from "@/store/gamificationStore"
import { Gift, Star, CheckCircle, Trophy, Target, TrendingUp, Users, Award, BookOpen, Briefcase, Building, Package } from "lucide-react"

export default function Rewards() {
  const { 
    points, 
    level, 
    availableRewards, 
    mentorLevels,
    sessionsCompleted,
    successRate,
    redeemReward,
    getNextLevel
  } = useGamificationStore()

  const nextLevel = getNextLevel()
  const progressToNextLevel = nextLevel ? ((points - level.pointsRequired) / (nextLevel.pointsRequired - level.pointsRequired)) * 100 : 100

  // Iconos por categoría
  const categoryIcons = {
    academic: BookOpen,
    professional: Briefcase,
    institutional: Building,
    tangible: Package
  }

  const categoryColors = {
    academic: "text-blue-400",
    professional: "text-green-400",
    institutional: "text-purple-400",
    tangible: "text-orange-400"
  }

  const categoryBgColors = {
    academic: "bg-blue-500 bg-opacity-20",
    professional: "bg-green-500 bg-opacity-20",
    institutional: "bg-purple-500 bg-opacity-20",
    tangible: "bg-orange-500 bg-opacity-20"
  }

  return (
    <div className="min-h-screen bg-[#1B1C31] p-6 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-[#6149E9] bg-opacity-20 rounded-2xl">
              <Gift className="w-8 h-8 text-[#6149E9]" />
            </div>
            <h1 className="text-3xl font-bold text-white">Sistema de Recompensas</h1>
          </div>
          <p className="text-[#A09BD3] text-lg">"Quien enseña, gana dos veces" - Tu camino como mentor</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 bg-[#6149E9] bg-opacity-20 rounded-lg">
                <Star className="w-5 h-5 text-[#6149E9]" />
              </div>
              <span className="text-2xl font-bold text-white">{points}</span>
            </div>
            <p className="text-[#A09BD3] text-sm">Puntos Totales</p>
          </div>

          <div className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 bg-[#6149E9] bg-opacity-20 rounded-lg">
                <Trophy className="w-5 h-5 text-[#6149E9]" />
              </div>
              <span className="text-2xl font-bold text-white">Nivel {level.level}</span>
            </div>
            <p className="text-[#A09BD3] text-sm">{level.title}</p>
          </div>

          <div className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 bg-[#6149E9] bg-opacity-20 rounded-lg">
                <Users className="w-5 h-5 text-[#6149E9]" />
              </div>
              <span className="text-2xl font-bold text-white">{sessionsCompleted}</span>
            </div>
            <p className="text-[#A09BD3] text-sm">Sesiones Completadas</p>
          </div>

          <div className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 bg-[#6149E9] bg-opacity-20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#6149E9]" />
              </div>
              <span className="text-2xl font-bold text-white">{successRate}%</span>
            </div>
            <p className="text-[#A09BD3] text-sm">Tasa de Éxito</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda - Progresión de Niveles */}
          <div className="lg:col-span-1">
            <div className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-[#6149E9] bg-opacity-20 rounded-lg">
                  <Target className="w-5 h-5 text-[#6149E9]" />
                </div>
                Tu Progresión
              </h2>

              {/* Barra de Progreso */}
              {nextLevel && (
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-[#A09BD3] mb-3">
                    <span className="font-medium">Nivel {level.level}</span>
                    <span className="font-medium">Nivel {nextLevel.level}</span>
                  </div>
                  <div className="w-full bg-[#1B1C31] rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#6149E9] to-[#A09BD3] h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-[#A09BD3] text-sm mt-2">
                    {points - level.pointsRequired} / {nextLevel.pointsRequired - level.pointsRequired} puntos
                  </div>
                </div>
              )}

              {/* Niveles */}
              <div className="space-y-4">
                {mentorLevels.map((lvl) => {
                  const isCurrent = level.level === lvl.level
                  const isUnlocked = level.level >= lvl.level
                  const Icon = isCurrent ? Trophy : isUnlocked ? CheckCircle : Target
                  
                  return (
                    <div 
                      key={lvl.level}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isCurrent 
                          ? 'border-[#6149E9] bg-[#6149E9] bg-opacity-10' 
                          : isUnlocked
                          ? 'border-[#A09BD3] border-opacity-30 bg-[#2A2B45]'
                          : 'border-[#A09BD3] border-opacity-20 bg-[#1B1C31] bg-opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            isCurrent ? 'bg-[#6149E9]' : 
                            isUnlocked ? 'bg-[#A09BD3] bg-opacity-20' : 
                            'bg-[#1B1C31]'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              isCurrent ? 'text-white' : 
                              isUnlocked ? 'text-[#A09BD3]' : 
                              'text-[#A09BD3] text-opacity-50'
                            }`} />
                          </div>
                          <span className={`font-semibold ${
                            isCurrent ? 'text-[#6149E9]' : 
                            isUnlocked ? 'text-white' : 
                            'text-[#A09BD3] text-opacity-60'
                          }`}>
                            {lvl.title}
                          </span>
                        </div>
                        <span className="text-sm text-[#A09BD3] font-medium">{lvl.pointsRequired} pts</span>
                      </div>
                      
                      <div className="text-sm space-y-2">
                        {lvl.benefits.slice(0, 2).map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-[#A09BD3]">
                            <Award className="w-3 h-3 text-[#6149E9]" />
                            <span className={isUnlocked ? "text-[#A09BD3]" : "text-[#A09BD3] text-opacity-50"}>
                              {benefit}
                            </span>
                          </div>
                        ))}
                        {lvl.benefits.length > 2 && (
                          <div className="text-xs text-[#6149E9] font-medium">
                            +{lvl.benefits.length - 2} beneficios más
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Columna Derecha - Recompensas Disponibles */}
          <div className="lg:col-span-2">
            <div className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20 mb-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-[#6149E9] bg-opacity-20 rounded-lg">
                  <Gift className="w-5 h-5 text-[#6149E9]" />
                </div>
                Recompensas Disponibles
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => {
                  const CategoryIcon = categoryIcons[reward.category]
                  const canRedeem = points >= reward.pointsRequired && level.level >= reward.requiredLevel
                  
                  return (
                    <div 
                      key={reward.id} 
                      className="bg-[#1B1C31] rounded-xl p-5 border border-[#A09BD3] border-opacity-20 hover:border-[#6149E9] transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#6149E9] transition-colors">
                            {reward.name}
                          </h3>
                          <p className="text-[#A09BD3] text-sm leading-relaxed">{reward.description}</p>
                        </div>
                        <div className={`p-2 rounded-lg ml-3 ${categoryBgColors[reward.category]}`}>
                          <CategoryIcon className={`w-5 h-5 ${categoryColors[reward.category]}`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-[#6149E9] bg-opacity-20 rounded">
                            <Star className="w-4 h-4 text-[#6149E9]" />
                          </div>
                          <span className={`font-bold ${canRedeem ? 'text-[#6149E9]' : 'text-[#A09BD3]'}`}>
                            {reward.pointsRequired}
                          </span>
                          <span className="text-[#A09BD3] text-sm">puntos</span>
                        </div>
                        
                        <button
                          onClick={() => redeemReward(reward.id)}
                          disabled={!canRedeem}
                          className="flex items-center gap-2 bg-[#6149E9] text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#5540d6] transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Canjear
                        </button>
                      </div>

                      {/* Requisitos adicionales */}
                      <div className="mt-3 text-xs text-[#A09BD3] space-y-1">
                        {reward.requiredLevel > 1 && (
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Requiere nivel {reward.requiredLevel}+
                          </div>
                        )}
                        <div className="flex items-center gap-1 capitalize">
                          <CategoryIcon className="w-3 h-3" />
                          Categoría: {reward.category}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Cómo Ganar Puntos */}
            <div className="bg-[#2A2B45] rounded-2xl p-6 border border-[#A09BD3] border-opacity-20">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-[#6149E9] bg-opacity-20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#6149E9]" />
                </div>
                Cómo Ganar Puntos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#6149E9] mb-2">+50</div>
                  <div className="text-sm text-[#A09BD3]">Sesión completada</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#6149E9] mb-2">+200</div>
                  <div className="text-sm text-[#A09BD3]">Alumno aprueba</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#6149E9] mb-2">+25</div>
                  <div className="text-sm text-[#A09BD3]">Feedback positivo</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#6149E9] mb-2">+100</div>
                  <div className="text-sm text-[#A09BD3]">Mentoría continua</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
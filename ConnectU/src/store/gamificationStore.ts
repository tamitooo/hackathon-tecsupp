// store/gamificationStore.ts
import { create } from 'zustand'

interface Reward {
  id: string
  name: string
  description: string
  pointsRequired: number
  requiredLevel: number
  category: 'academic' | 'professional' | 'institutional' | 'tangible'
}

interface MentorLevel {
  level: number
  title: string
  pointsRequired: number
  benefits: string[]
}

interface GamificationState {
  points: number
  level: MentorLevel
  sessionsCompleted: number
  successRate: number
  availableRewards: Reward[]
  mentorLevels: MentorLevel[]
  earnedRewards: string[]
  
  // Actions
  addPoints: (points: number, reason: string) => void
  redeemReward: (rewardId: string) => void
  completeSession: (success: boolean) => void
  getNextLevel: () => MentorLevel | null
}

export const useGamificationStore = create<GamificationState>((set, get) => ({
  points: 750,
  sessionsCompleted: 12,
  successRate: 92,
  
  // Sistema de niveles actualizado
  level: {
    level: 2,
    title: "Mentor Activo",
    pointsRequired: 500,
    benefits: [
      "Prioridad en matching con estudiantes",
      "Perfil destacado en búsquedas", 
      "Cartas de recomendación personalizadas",
      "Acceso a eventos exclusivos UTEC"
    ]
  },
  
  mentorLevels: [
    {
      level: 1,
      title: "Mentor Novato",
      pointsRequired: 0,
      benefits: ["Acceso básico a mentorías", "Certificado digital de participación"]
    },
    {
      level: 2, 
      title: "Mentor Activo",
      pointsRequired: 500,
      benefits: ["Prioridad en matching", "Perfil destacado", "Cartas de recomendación"]
    },
    {
      level: 3,
      title: "Mentor Experto", 
      pointsRequired: 1500,
      benefits: ["Sesiones pagadas", "Acceso a eventos exclusivos", "Networking con empresas"]
    },
    {
      level: 4,
      title: "Mentor Elite",
      pointsRequired: 3000,
      benefits: ["Becas parciales en cursos", "Mentoría de carrera personalizada", "Featured en plataforma"]
    },
    {
      level: 5,
      title: "Mentor Embajador", 
      pointsRequired: 5000,
      benefits: ["Becas completas certificaciones", "Pasantías garantizadas", "Speaker en eventos institucionales"]
    }
  ],

  // Recompensas disponibles mejoradas
  availableRewards: [
    {
      id: "1",
      name: "Certificado de Voluntariado",
      description: "Certificado oficial validable por horas de mentoría",
      pointsRequired: 100,
      requiredLevel: 1,
      category: "academic"
    },
    {
      id: "2",
      name: "Carta de Recomendación",
      description: "Carta personalizada para tu CV y aplicaciones",
      pointsRequired: 200,
      requiredLevel: 2,
      category: "professional"
    },
    {
      id: "3",
      name: "Curso Online Premium",
      description: "Acceso a curso de especialización de tu elección",
      pointsRequired: 300,
      requiredLevel: 2,
      category: "academic"
    },
    {
      id: "4",
      name: "Perfil Destacado",
      description: "Tu perfil aparece destacado por 30 días",
      pointsRequired: 150,
      requiredLevel: 1,
      category: "professional"
    },
    {
      id: "5",
      name: "Sesión Career Coaching",
      description: "Sesión 1:1 con coach profesional especializado",
      pointsRequired: 400,
      requiredLevel: 3,
      category: "professional"
    },
    {
      id: "6",
      name: "Kit ConnectU",
      description: "Kit de merchandising oficial de la plataforma",
      pointsRequired: 250,
      requiredLevel: 2,
      category: "tangible"
    },
    {
      id: "7",
      name: "Ticket Conferencia Tech",
      description: "Acceso a conferencia tecnológica especializada",
      pointsRequired: 350,
      requiredLevel: 3,
      category: "professional"
    },
    {
      id: "8",
      name: "Reconocimiento Institucional",
      description: "Reconocimiento oficial de la universidad",
      pointsRequired: 500,
      requiredLevel: 4,
      category: "institutional"
    }
  ],

  earnedRewards: [],

  addPoints: (pointsToAdd: number) => {
    const { points, mentorLevels } = get()
    const newPoints = points + pointsToAdd
    
    // Verificar si subió de nivel
    const currentLevel = get().level
    const nextLevel = mentorLevels.find(lvl => lvl.level === currentLevel.level + 1)
    
    let newLevel = currentLevel
    if (nextLevel && newPoints >= nextLevel.pointsRequired) {
      newLevel = nextLevel
    }

    set({ 
      points: newPoints,
      level: newLevel
    })
  },

  redeemReward: (rewardId: string) => {
    const { points, availableRewards, earnedRewards, level } = get()
    const reward = availableRewards.find(r => r.id === rewardId)
    
    if (!reward) return

    if (points >= reward.pointsRequired && level.level >= reward.requiredLevel) {
      set({
        points: points - reward.pointsRequired,
        earnedRewards: [...earnedRewards, rewardId]
      })
      alert(`¡Felicidades! Has canjeado: ${reward.name}`)
    } else {
      alert("No cumples con los requisitos para canjear esta recompensa")
    }
  },

  completeSession: (success: boolean) => {
    const { sessionsCompleted, addPoints } = get()
    
    // Puntos base por sesión completada
    addPoints(50, "Sesión completada")
    
    if (success) {
      addPoints(25, "Sesión exitosa")
    }
    
    set({ 
      sessionsCompleted: sessionsCompleted + 1 
    })
  },

  getNextLevel: () => {
    const { level, mentorLevels } = get()
    return mentorLevels.find(lvl => lvl.level === level.level + 1) || null
  }
}))
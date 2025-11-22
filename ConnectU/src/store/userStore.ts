import { create } from "zustand"
interface UserStoreState {
  riskScore: number
  riskType: string
  strengths: string[]
  weaknesses: string[]
  badges: string[]
  stats: {
    matches: number
    chats: number
    level: number
    points: number
    sessions: number // Add this
  }
  setRiskScore: (score: number) => void
  setRiskType: (type: string) => void
  setStrengths: (strengths: string[]) => void
  setWeaknesses: (weaknesses: string[]) => void
  setBadges: (badges: string[]) => void
  setStats: (stats: any) => void
}

export const useUserStore = create<UserStoreState>((set) => ({
  riskScore: 0,
  riskType: "",
  strengths: [],
  weaknesses: [],
  badges: [],
  stats: {
    matches: 0,
    chats: 0,
    level: 1,
    points: 0,
    sessions: 0, // Add this with default value
  },
  setRiskScore: (score) => set({ riskScore: score }),
  setRiskType: (type) => set({ riskType: type }),
  setStrengths: (strengths) => set({ strengths }),
  setWeaknesses: (weaknesses) => set({ weaknesses }),
  setBadges: (badges) => set({ badges }),
  setStats: (stats) => set({ stats }),
}))
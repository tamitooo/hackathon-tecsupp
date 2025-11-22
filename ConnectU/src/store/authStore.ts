import { create } from "zustand"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  university: string
  career: string
  semester: number
  avatar?: string
  bio?: string
}

interface AuthStoreState {
  token: string | null
  user: User | null
  email: string
  onboardingCompleted: boolean
  setToken: (token: string) => void
  setUser: (user: User) => void
  setEmail: (email: string) => void
  setOnboardingCompleted: (completed: boolean) => void
  logout: () => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  token: null,
  user: null,
  email: "",
  onboardingCompleted: false,
  setToken: (token) => {
    localStorage.setItem("token", token)
    set({ token })
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    set({ user })
  },
  setEmail: (email) => set({ email }),
  setOnboardingCompleted: (completed) => {
    localStorage.setItem("onboardingCompleted", JSON.stringify(completed))
    set({ onboardingCompleted: completed })
  },
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("onboardingCompleted")
    set({ token: null, user: null, onboardingCompleted: false })
  },
  initializeAuth: () => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")

    set({
      token: token || null,
      user: user ? JSON.parse(user) : null,
      onboardingCompleted: onboardingCompleted ? JSON.parse(onboardingCompleted) : false,
    })
  },
}))

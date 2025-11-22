import api from "./axios"

export const authApi = {
  sendVerification: async (email: string) => {
    return api.post("/auth/send-verification", { email })
  },
  verifyCode: async (email: string, code: string) => {
    return api.post("/auth/verify", { email, code })
  },
  onboarding: async (data: any) => {
    return api.post("/auth/onboarding", data)
  },
}

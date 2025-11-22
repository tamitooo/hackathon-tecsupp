import api from "./axios"

export const matchesApi = {
  getCandidates: async () => {
    return api.get("/matches/candidates")
  },
  requestMatch: async (userId: string, matchType: string) => {
    return api.post("/matches/request", { userId, matchType })
  },
}

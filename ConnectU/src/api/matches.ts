import api from "./axios"

export const matchesApi = {
  getCandidates: async (userId: string) => {
    return api.get(`/matches/candidates?user_id=${userId}`)
  },
  requestMatch: async (userId: string, candidateId: string, candidateName: string, matchType: string, compatibilityScore: number) => {
    return api.post("/matches/request", { 
      user_id: parseInt(userId.replace('uuid-', '')), 
      candidate_id: parseInt(candidateId.replace('uuid-', '')), 
      candidate_name: candidateName,
      match_type: matchType,
      compatibility_score: compatibilityScore
    })
  },
}
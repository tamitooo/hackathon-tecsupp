import api from "./axios"

export const usersApi = {
  getMe: async () => {
    return api.get("/users/me")
  },
  updateMe: async (data: any) => {
    return api.patch("/users/me", data)
  },
  uploadProfileImage: async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return api.post("/users/me/profile-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },
  uploadGrades: async (data: any) => {
    return api.post("/users/me/grades", data)
  },
  getUserById: async (userId: string) => {
    return api.get(`/users/${userId}`)
  },
}

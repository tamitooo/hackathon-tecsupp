"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, Users, User, LogOut, MessageCircle } from "lucide-react"
import { useAuthStore } from "../store/authStore"

export default function WebNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/matches", label: "Matches", icon: Users },
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/profile", label: "Profile", icon: User },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Obtener el nombre del usuario de manera segura según tu interface User
  const getUserName = () => {
    if (!user) return "Usuario"
    
    if (user.firstName) return user.firstName
    if (user.email) return user.email.split('@')[0]
    
    return "Usuario"
  }

  return (
    <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-8 py-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img 
              src="/LOGOCONECTU.png" 
              alt="ConnectU Logo" 
              className="h-8 w-auto" // Ajusta el tamaño según necesites
            />
          </Link>
          
          {/* Navigation Items */}
          <div className="flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? "text-[#6149E9] bg-[#2A2B45]" 
                      : "text-[#A09BD3] hover:text-white hover:bg-[#2A2B45]"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <span className="text-white">Hola, {getUserName()}</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-[#A09BD3] hover:text-red-500 hover:bg-[#2A2B45] transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
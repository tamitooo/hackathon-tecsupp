"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { Home, Users, User, LogOut, MessageCircle, Gift, Menu, X } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import { useState } from "react"

export default function WebNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/matches", label: "Matches", icon: Users },
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/rewards", label: "Recompensas", icon: Gift },
    { path: "/profile", label: "Perfil", icon: User },
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const getUserName = () => {
    if (!user) return "Usuario"
    
    if (user.firstName) return user.firstName
    if (user.email) return user.email.split('@')[0]
    
    return "Usuario"
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-4 py-4 lg:px-8 lg:py-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/LOGOCONECTU.png" 
                alt="ConnectU Logo" 
                className="h-6 lg:h-8 w-auto"
              />
              <span className="font-poppins text-white font-extralight text-lg lg:text-xl">
                ConectU
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Items - Oculto en móvil */}
          <div className="hidden lg:flex items-center space-x-6">
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

          {/* Desktop User Menu - Oculto en móvil */}
          <div className="hidden lg:flex items-center space-x-4">
            <span className="text-white text-sm">Hola, {getUserName()}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-[#A09BD3] hover:text-red-500 hover:bg-[#2A2B45] transition-colors"
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </div>

          {/* Mobile Menu Button - Solo visible en móvil */}
          <div className="flex lg:hidden items-center space-x-3">
            <span className="text-white text-sm hidden sm:block">Hola, {getUserName()}</span>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-[#A09BD3] hover:text-white hover:bg-[#2A2B45] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Solo visible en móvil cuando está abierto */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#1B1C31] border-b border-[#A09BD3]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile Navigation Items */}
            <div className="space-y-2 mb-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
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

            {/* Mobile User Info and Logout */}
            <div className="pt-4 border-t border-[#A09BD3]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white text-sm">Conectado como</span>
                <span className="text-[#6149E9] font-medium">{getUserName()}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-red-400 hover:text-red-500 hover:bg-[#2A2B45] transition-colors border border-red-400 hover:border-red-500"
              >
                <LogOut size={20} />
                <span className="font-medium">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
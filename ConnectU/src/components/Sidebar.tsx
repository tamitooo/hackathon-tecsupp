'use client'

import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from '@/lib/utils'
import { Home, Users, User, LogOut, MessageCircle } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

// Versión simplificada del Sidebar
export function SimpleSidebar() {
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

  const getUserName = () => {
    if (!user) return "Usuario"
    if (user.firstName) return user.firstName
    if (user.email) return user.email.split('@')[0]
    return "Usuario"
  }

  return (
    <div className="w-64 bg-gradient-to-b from-[#2A2B45] to-[#1B1C31] text-white h-screen flex flex-col border-r border-[#A09BD3]/10 shadow-2xl">
      {/* Header with Logo */}
      <div className="p-6 border-b border-[#A09BD3]/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white leading-tight">ConnectU</h1>
            <p className="text-xs text-[#A09BD3]">Student Platform</p>
          </div>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="p-4 mx-4 mt-4 bg-[#1B1C31]/50 rounded-xl border border-[#A09BD3]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full flex items-center justify-center ring-2 ring-[#6149E9]/30">
            <span className="text-white text-sm font-bold">
              {getUserName().charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{getUserName()}</p>
            <p className="text-[#A09BD3] text-xs truncate">Student</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 mt-2">
        <p className="text-[#A09BD3] text-xs font-semibold uppercase tracking-wider mb-3 px-3">Main Menu</p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-[#6149E9] to-[#7c5ef0] text-white font-semibold shadow-lg shadow-[#6149E9]/30'
                      : 'text-[#A09BD3] hover:bg-[#1B1C31]/80 hover:text-white'
                  )}
                >
                  <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-[#A09BD3]/10 bg-[#1B1C31]/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-[#A09BD3] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
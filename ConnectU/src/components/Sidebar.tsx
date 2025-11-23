'use client'

import * as React from 'react'
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
    <div className="w-64 bg-[#1B1C31] text-white h-screen flex flex-col border-r border-[#A09BD3] border-opacity-20">
      {/* Header */}
      <div className="p-6 border-b border-[#A09BD3] border-opacity-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6149E9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white leading-tight">Connecta</h1>
            <h1 className="text-xl font-bold text-white leading-tight">UTEC</h1>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 w-full p-3 rounded-lg transition-all',
                    isActive
                      ? 'bg-[#6149E9] text-white font-semibold'
                      : 'text-[#A09BD3] hover:bg-[#2A2B45] hover:text-white'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#A09BD3] border-opacity-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {getUserName().charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Hola, {getUserName()}</p>
            <p className="text-[#A09BD3] text-xs truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg text-[#A09BD3] hover:text-red-500 hover:bg-[#2A2B45] transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
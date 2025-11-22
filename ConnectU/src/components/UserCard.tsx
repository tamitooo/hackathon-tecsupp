"use client"

import { MessageCircle, Star, MapPin } from "lucide-react"

interface UserCardProps {
  user: {
    id: string
    name: string
    avatar?: string
    career: string
    university?: string
    badges: string[]
    bio?: string
    compatibility?: number
    online?: boolean
    lastActive?: string
  }
  onOpenChat?: () => void
}

export default function UserCard({ user, onOpenChat }: UserCardProps) {
  return (
    <div className="bg-[#2A2B45] rounded-2xl p-4 border border-[#A09BD3] border-opacity-20 hover:border-opacity-40 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          {user.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2A2B45]"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-white text-lg">{user.name}</h3>
              <p className="text-[#A09BD3] text-sm">{user.career}</p>
              {user.university && (
                <p className="text-[#A09BD3] text-xs flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  {user.university}
                </p>
              )}
            </div>
            
            {/* Compatibility */}
            {user.compatibility && (
              <div className="flex items-center gap-1 bg-[#6149E9] bg-opacity-20 px-2 py-1 rounded-full">
                <Star size={12} className="text-[#6149E9]" />
                <span className="text-[#6149E9] text-xs font-semibold">{user.compatibility}%</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-[#A09BD3] text-sm mb-3 line-clamp-2">{user.bio}</p>
          )}

          {/* Badges */}
          {user.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {user.badges.slice(0, 2).map((badge, index) => (
                <span
                  key={index}
                  className="bg-[#A09BD3] bg-opacity-20 text-[#A09BD3] px-2 py-1 rounded text-xs"
                >
                  {badge}
                </span>
              ))}
              {user.badges.length > 2 && (
                <span className="text-[#A09BD3] text-xs">+{user.badges.length - 2}</span>
              )}
            </div>
          )}

          {/* Last Active */}
          {user.lastActive && (
            <p className="text-[#A09BD3] text-xs">{user.lastActive}</p>
          )}
        </div>
      </div>

      {/* Action Button */}
      {onOpenChat && (
        <div className="flex justify-end mt-4">
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6149E9] text-white hover:bg-[#5540d6] transition-colors text-sm font-semibold"
          >
            <MessageCircle size={16} />
            Chat
          </button>
        </div>
      )}
    </div>
  )
}
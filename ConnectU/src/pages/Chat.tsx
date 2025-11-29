"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Send, Search, Calendar, Clock, CheckCircle, X, MoreVertical, ArrowLeft, Menu } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "other"
  text: string
  timestamp: Date
  type: "text" | "session_invite" | "session_confirmed" | "session_completed"
  sessionData?: {
    id: string
    scheduledAt: Date
    duration: number
    title: string
    status: "pending" | "confirmed" | "completed" | "cancelled"
  }
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unread: number
  online: boolean
  isMentor: boolean
  career: string
  level: number
}

export default function Chat() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showConversations, setShowConversations] = useState(false)
  const [sessionTitle, setSessionTitle] = useState("")
  const [sessionDate, setSessionDate] = useState("")
  const [sessionTime, setSessionTime] = useState("")
  const [sessionDuration, setSessionDuration] = useState(60)

  // Lista de conversaciones
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "SC",
      lastMessage: "¿Te parece bien el jueves a las 3pm?",
      timestamp: new Date(Date.now() - 1800000),
      unread: 0,
      online: true,
      isMentor: true,
      career: "Computer Science",
      level: 4
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      avatar: "AR",
      lastMessage: "¡Gracias por la ayuda con cálculo!",
      timestamp: new Date(Date.now() - 86400000),
      unread: 2,
      online: false,
      isMentor: false,
      career: "Engineering",
      level: 2
    },
    {
      id: "3",
      name: "Maria Garcia",
      avatar: "MG",
      lastMessage: "¿Podemos repasar el proyecto?",
      timestamp: new Date(Date.now() - 7200000),
      unread: 0,
      online: true,
      isMentor: true,
      career: "Data Science",
      level: 3
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      sender: "other", 
      text: "¡Hola! Soy Sarah, tu mentora de cálculo. ¿En qué puedo ayudarte?", 
      timestamp: new Date(Date.now() - 3600000),
      type: "text"
    },
    { 
      id: "2", 
      sender: "user", 
      text: "Hola Sarah, tengo dudas con límites y continuidad", 
      timestamp: new Date(Date.now() - 3000000),
      type: "text"
    },
    {
      id: "3",
      sender: "other",
      text: "Perfecto, son temas importantes. ¿Te parece bien si coordinamos una sesión de estudio?",
      timestamp: new Date(Date.now() - 1800000),
      type: "text"
    },
  ])
  const [input, setInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const currentConversation = conversations.find(conv => conv.id === id) || conversations[0]

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // En móvil, mostrar conversaciones si no hay chat seleccionado
  useEffect(() => {
    if (!id && window.innerWidth < 1024) {
      setShowConversations(true)
    }
  }, [id])

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: input,
        timestamp: new Date(),
        type: "text"
      }
      setMessages([...messages, newMessage])
      setInput("")
    }
  }

  const handleScheduleSession = () => {
    if (!sessionTitle || !sessionDate || !sessionTime) return

    const scheduledAt = new Date(`${sessionDate}T${sessionTime}`)
    
    const sessionMessage: Message = {
      id: `session-${Date.now()}`,
      sender: "user",
      text: `He agendado una sesión: ${sessionTitle}`,
      timestamp: new Date(),
      type: "session_invite",
      sessionData: {
        id: `session-${Date.now()}`,
        scheduledAt,
        duration: sessionDuration,
        title: sessionTitle,
        status: "pending"
      }
    }

    setMessages([...messages, sessionMessage])
    setShowScheduleModal(false)
    setSessionTitle("")
    setSessionDate("")
    setSessionTime("")
    setSessionDuration(60)
  }

  const handleConfirmSession = (sessionId: string) => {
    setMessages(messages.map(msg => 
      msg.id === sessionId && msg.sessionData
        ? {
            ...msg,
            sessionData: { ...msg.sessionData, status: "confirmed" },
            type: "session_confirmed"
          }
        : msg
    ))
  }

  const handleCompleteSession = (sessionId: string) => {
    setMessages(messages.map(msg => 
      msg.id === sessionId && msg.sessionData
        ? {
            ...msg,
            sessionData: { ...msg.sessionData, status: "completed" },
            type: "session_completed"
          }
        : msg
    ))
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatSessionTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatMessageTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return "Ahora"
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min`
  if (diff < 86400000) return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

  const SessionInviteMessage = ({ message }: { message: Message }) => {
    if (!message.sessionData) return null

    const { sessionData } = message

    return (
      <div className={`max-w-[85vw] sm:max-w-md bg-[#2A2B45] border-2 border-[#6149E9] rounded-2xl p-3 sm:p-4 ${
        message.sender === "user" ? "ml-auto" : "mr-auto"
      }`}>
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#6149E9]" />
          <h3 className="font-semibold text-white text-sm sm:text-base">Invitación de Sesión</h3>
        </div>
        
        <div className="space-y-2 mb-3 sm:mb-4">
          <p className="text-white font-medium text-sm sm:text-base">{sessionData.title}</p>
          <div className="flex items-center gap-2 text-[#A09BD3] text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{formatSessionTime(sessionData.scheduledAt)}</span>
          </div>
          <div className="text-[#A09BD3] text-xs sm:text-sm">
            Duración: {sessionData.duration} minutos
          </div>
        </div>

        {sessionData.status === "pending" && message.sender === "other" && (
          <div className="flex gap-2">
            <button
              onClick={() => handleConfirmSession(message.id)}
              className="flex-1 bg-[#6149E9] text-white py-2 rounded-lg font-semibold hover:bg-[#5540d6] transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              Aceptar
            </button>
            <button className="px-3 sm:px-4 bg-[#2A2B45] border border-[#A09BD3] text-[#A09BD3] rounded-lg hover:bg-[#3A3B55] transition-colors">
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}

        {sessionData.status === "confirmed" && (
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-green-400 text-xs sm:text-sm font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              Sesión confirmada
            </span>
            <button
              onClick={() => handleCompleteSession(message.id)}
              className="bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm hover:bg-green-700 transition-colors"
            >
              Completar
            </button>
          </div>
        )}

        {sessionData.status === "completed" && (
          <span className="text-blue-400 text-xs sm:text-sm font-medium flex items-center gap-1">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Sesión completada
          </span>
        )}
      </div>
    )
  }

  // En móvil, mostrar solo conversaciones o solo chat
  const mobileView = window.innerWidth < 1024

  return (
    <div className="h-screen bg-[#1B1C31] flex">
      {/* Modal para Agendar Sesión */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2A2B45] rounded-2xl p-4 sm:p-6 w-full max-w-md mx-4">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Agendar Sesión</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A09BD3] mb-1">
                  Título de la sesión
                </label>
                <input
                  type="text"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  placeholder="Ej: Repaso de Cálculo 2"
                  className="w-full px-3 py-2 rounded-lg bg-[#1B1C31] text-white border border-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A09BD3] mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1B1C31] text-white border border-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#A09BD3] mb-1">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1B1C31] text-white border border-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A09BD3] mb-1">
                  Duración (minutos)
                </label>
                <select
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-[#1B1C31] text-white border border-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] text-sm sm:text-base"
                >
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={90}>1 hora 30 min</option>
                  <option value={120}>2 horas</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 border border-[#A09BD3] text-[#A09BD3] rounded-lg hover:bg-[#3A3B55] transition-colors text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={handleScheduleSession}
                disabled={!sessionTitle || !sessionDate || !sessionTime}
                className="flex-1 px-4 py-2 bg-[#6149E9] text-white rounded-lg font-semibold hover:bg-[#5540d6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conversations Sidebar - Visible en desktop o móvil cuando se requiere */}
      <div className={`
        ${mobileView ? (showConversations ? 'flex' : 'hidden') : 'flex'} 
        w-full lg:w-80 border-r border-[#A09BD3]/20 bg-[#1B1C31] flex-col
        fixed lg:relative inset-0 z-40 lg:z-auto
      `}>
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between p-4 border-b border-[#A09BD3]/20">
          <h1 className="text-xl font-bold text-white">Conversaciones</h1>
          <button
            onClick={() => setShowConversations(false)}
            className="p-2 text-[#A09BD3] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block p-4 border-b border-[#A09BD3]/20">
          <h1 className="text-xl font-bold text-white">Mensajes</h1>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#A09BD3]/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A09BD3]" size={20} />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2A2B45] text-white placeholder-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] border-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => {
                navigate(`/chat/${conversation.id}`)
                if (mobileView) setShowConversations(false)
              }}
              className={`p-3 sm:p-4 border-b border-[#2A2B45] cursor-pointer transition-colors ${
                currentConversation.id === conversation.id 
                  ? "bg-[#6149E9] bg-opacity-20 border-r-2 border-[#6149E9]" 
                  : "hover:bg-[#2A2B45]"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-[#1B1C31]"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate">{conversation.name}</h3>
                      {conversation.isMentor && (
                        <span className="px-1.5 py-0.5 bg-[#6149E9] text-xs text-white rounded-full">
                          Mentor
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#A09BD3] flex-shrink-0">
                      {formatMessageTime(conversation.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A09BD3] truncate mt-1">{conversation.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#A09BD3]">{conversation.career}</span>
                    <span className="text-xs text-[#6149E9]">• Nvl {conversation.level}</span>
                  </div>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#6149E9] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">{conversation.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area - Oculto en móvil si no hay chat seleccionado */}
      <div className={`
        ${mobileView ? (showConversations ? 'hidden' : 'flex') : 'flex'} 
        flex-1 flex-col bg-[#1B1C31] min-w-0
      `}>
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#A09BD3]/20 bg-[#2A2B45]">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Back Button - Solo en móvil */}
            {mobileView && (
              <button
                onClick={() => setShowConversations(true)}
                className="p-2 text-[#A09BD3] hover:text-white hover:bg-[#3A3B55] rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6149E9] to-[#A09BD3] rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                {currentConversation.avatar}
              </div>
              {currentConversation.online && (
                <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-[#2A2B45] animate-pulse"></div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-white text-base sm:text-lg truncate">{currentConversation.name}</h1>
                {currentConversation.isMentor && (
                  <span className="px-2 py-0.5 bg-[#6149E9] text-xs text-white rounded-full flex-shrink-0">
                    Mentor
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm text-[#A09BD3] truncate">
                {currentConversation.online ? (
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                    En línea
                  </span>
                ) : (
                  `Visto ${formatMessageTime(currentConversation.timestamp)}`
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Botón Agendar Sesión - Solo si es mentor */}
            {currentConversation.isMentor && (
              <button
                onClick={() => setShowScheduleModal(true)}
                className="hidden sm:flex items-center gap-2 bg-[#6149E9] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-[#5540d6] transition-colors whitespace-nowrap text-sm sm:text-base"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                Agendar
              </button>
            )}
            
            <button className="p-2 text-[#A09BD3] hover:text-white hover:bg-[#3A3B55] rounded-lg transition-colors flex-shrink-0">
              <MoreVertical size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-[#1B1C31]">
          <div className="h-full flex flex-col">
            <div className="flex-1 p-3 sm:p-4">
              <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {message.type === "text" ? (
                      <div className="flex flex-col max-w-[85vw] sm:max-w-md">
                        <div
                          className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-[#6149E9] text-white rounded-br-none"
                              : "bg-[#2A2B45] text-white rounded-bl-none border border-[#A09BD3]/20"
                          }`}
                        >
                          <p className="text-sm break-words">{message.text}</p>
                        </div>
                        <span className={`text-xs text-[#A09BD3] mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                    ) : (
                      <SessionInviteMessage message={message} />
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-4 border-t border-[#A09BD3]/20 bg-[#2A2B45]">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-[#1B1C31] text-white placeholder-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] border border-[#A09BD3]/20 text-sm sm:text-base"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#6149E9] text-white hover:bg-[#5540d6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button para mostrar conversaciones en móvil */}
      {mobileView && !showConversations && (
        <button
          onClick={() => setShowConversations(true)}
          className="lg:hidden fixed bottom-4 right-4 w-12 h-12 bg-[#6149E9] text-white rounded-full shadow-lg flex items-center justify-center z-30 hover:bg-[#5540d6] transition-colors"
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  )
}
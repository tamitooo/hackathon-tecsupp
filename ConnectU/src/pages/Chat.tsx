"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Send, Search } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "other"
  text: string
  timestamp: Date
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unread: number
  online: boolean
}

export default function Chat() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  // Lista de conversaciones
  const [conversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "SC",
      lastMessage: "Doing well. Want to study together?",
      timestamp: new Date(Date.now() - 1800000),
      unread: 0,
      online: true
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      avatar: "AR",
      lastMessage: "Thanks for the help with calculus!",
      timestamp: new Date(Date.now() - 86400000),
      unread: 2,
      online: false
    },
    {
      id: "3",
      name: "Maria Garcia",
      avatar: "MG",
      lastMessage: "See you in class tomorrow",
      timestamp: new Date(Date.now() - 172800000),
      unread: 0,
      online: true
    },
    {
      id: "4",
      name: "David Kim",
      avatar: "DK",
      lastMessage: "The project deadline is next week",
      timestamp: new Date(Date.now() - 259200000),
      unread: 1,
      online: false
    }
  ])

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "other", text: "Hey! How are you?", timestamp: new Date(Date.now() - 3600000) },
    { id: "2", sender: "user", text: "Great! How about you?", timestamp: new Date(Date.now() - 3000000) },
    {
      id: "3",
      sender: "other",
      text: "Doing well. Want to study together?",
      timestamp: new Date(Date.now() - 1800000),
    },
  ])
  const [input, setInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const currentConversation = conversations.find(conv => conv.id === id) || conversations[0]

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        sender: "user",
        text: input,
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInput("")
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#1B1C31]">

      {/* Chat Layout */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-[#A09BD3] bg-[#1B1C31] flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-[#A09BD3]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A09BD3]" size={20} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2A2B45] text-white placeholder-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9]"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => navigate(`/chat/${conversation.id}`)}
                className={`p-4 border-b border-[#2A2B45] cursor-pointer transition-colors ${
                  currentConversation.id === conversation.id 
                    ? "bg-[#6149E9] bg-opacity-20" 
                    : "hover:bg-[#2A2B45]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#6149E9] rounded-full flex items-center justify-center text-white font-semibold">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1B1C31]"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-white truncate">{conversation.name}</h3>
                      <span className="text-xs text-[#A09BD3]">
                        {conversation.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm text-[#A09BD3] truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-[#6149E9] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">{conversation.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#1B1C31]">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#A09BD3]">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#6149E9] rounded-full flex items-center justify-center text-white font-semibold">
                  {currentConversation.avatar}
                </div>
                {currentConversation.online && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-[#1B1C31]"></div>
                )}
              </div>
              <div>
                <h1 className="font-semibold text-white text-lg">{currentConversation.name}</h1>
                <p className="text-sm text-[#A09BD3]">
                  {currentConversation.online ? "Online" : "Last seen recently"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-[#6149E9] text-white rounded-br-none"
                      : "bg-[#2A2B45] text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#A09BD3]">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-3 rounded-lg bg-[#2A2B45] text-white placeholder-[#A09BD3] focus:outline-none focus:ring-2 focus:ring-[#6149E9] border-none"
              />
              <button
                onClick={handleSend}
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#6149E9] text-white hover:bg-[#5540d6] transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
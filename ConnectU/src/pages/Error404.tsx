"use client"

import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function Error404() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#1B1C31]">
      {/* Navbar */}
      <nav className="bg-[#1B1C31] border-b border-[#A09BD3] px-6 py-4">
        <div className="">
          <h1 className="text-2xl font-bold text-white">ConnectU</h1>
        </div>
      </nav>

      {/* Error Content */}
      <div className="flex items-center justify-center p-8 min-h-[calc(100vh-120px)]">
        <div className="text-center space-y-8 max-w-2xl">
          {/* Animated 404 */}
          <div className="relative">
            <div className="text-9xl font-bold text-[#6149E9] opacity-20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-white bg-[#6149E9] rounded-2xl px-8 py-4 transform rotate-6 shadow-2xl">
                404
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Oops! Page Not Found
            </h2>
            <p className="text-[#A09BD3] text-lg leading-relaxed">
              The page you're looking for seems to have wandered off into the digital void. 
              Don't worry, even the best students get lost sometimes!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2 min-w-48"
            >
              <ArrowLeft size={20} />
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="primary"
              className="flex items-center gap-2 min-w-48"
            >
              <Home size={20} />
              Back to Home
            </Button>
          </div>

          {/* Additional Help */}
          <div className="bg-[#2A2B45] rounded-2xl p-6 mt-8 border border-[#A09BD3] border-opacity-20">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Search className="text-[#6149E9]" size={24} />
              <h3 className="text-xl font-semibold text-white">Need Help Finding Something?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <button 
                onClick={() => navigate("/matches")}
                className="p-3 rounded-lg bg-[#1B1C31] text-[#A09BD3] hover:text-white hover:bg-[#6149E9] transition-all duration-300"
              >
                👥 View Matches
              </button>
              <button 
                onClick={() => navigate("/profile")}
                className="p-3 rounded-lg bg-[#1B1C31] text-[#A09BD3] hover:text-white hover:bg-[#6149E9] transition-all duration-300"
              >
                👤 Your Profile
              </button>
              <button 
                onClick={() => navigate("/chat")}
                className="p-3 rounded-lg bg-[#1B1C31] text-[#A09BD3] hover:text-white hover:bg-[#6149E9] transition-all duration-300"
              >
                💬 Messages
              </button>
            </div>
          </div>

          {/* Fun Element */}
          <div className="mt-8">
            <p className="text-[#A09BD3] text-sm">
              🎓 <span className="text-[#6149E9]">Pro Tip:</span> Use the navigation above to explore ConnectU
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements for visual interest */}
      <div className="fixed top-1/4 left-10 w-4 h-4 bg-[#6149E9] rounded-full opacity-30 animate-pulse"></div>
      <div className="fixed top-1/3 right-20 w-6 h-6 bg-[#A09BD3] rounded-full opacity-20 animate-bounce"></div>
      <div className="fixed bottom-1/4 left-1/4 w-3 h-3 bg-[#6149E9] rounded-full opacity-40 animate-ping"></div>
    </div>
  )
}
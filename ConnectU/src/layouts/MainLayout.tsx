import { Outlet } from "react-router-dom"
import { SimpleSidebar } from "../components/Sidebar"

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f0f1e]">
      {/* Sidebar */}
      <SimpleSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-[#0f0f1e] via-[#1B1C31] to-[#0f0f1e]">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
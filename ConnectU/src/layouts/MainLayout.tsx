import { Outlet } from "react-router-dom"
import WebNavbar from "../components/Navbar"

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#1B1C31]">
      <WebNavbar />
      <main className=" ">
        <Outlet />
      </main>
    </div>
  )
}
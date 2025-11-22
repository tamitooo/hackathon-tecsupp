import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#1B1C31] ">
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}
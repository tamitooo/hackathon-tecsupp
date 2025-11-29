import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuthStore } from "@/store/authStore"

// Layouts
import AuthLayout from "@/layouts/AuthLayout"
import MainLayout from "@/layouts/MainLayout"

// Pages
import Login from "@/pages/Auth/Login"
import Verify from "@/pages/Auth/Verify"
import OnboardingStep1 from "@/pages/Onboarding/Step1Basic"
import OnboardingStep2 from "@/pages/Onboarding/Step2Academic"
import OnboardingStep3 from "@/pages/Onboarding/Step3Vocational"
import OnboardingStep4 from "@/pages/Onboarding/Step4Availability"
import Home from "@/pages/Home"
import Profile from "@/pages/Profile"
import EditProfile from "@/pages/EditProfile"
import Matches from "@/pages/Matches"
import Chat from "@/pages/Chat"
import Rewards from "@/pages/Rewards" 
import Error404 from "@/pages/Error404"

// Toaster para notificaciones
import { Toaster } from "@/components/ui/toaster"

// Protected route component - MODIFICADO PARA TESTING
interface PrivateRouteProps {
  element: React.ReactElement
  requireOnboarding?: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  element, 
  requireOnboarding = false 
}) => {
  const token = useAuthStore((state) => state.token)
  const onboardingCompleted = useAuthStore((state) => state.onboardingCompleted)

 
  if (!token) {
     return <Navigate to="/login" replace />
   }

  if (requireOnboarding && !onboardingCompleted) {
    return <Navigate to="/onboarding/step1" replace />
  }

  return element
}

// Ruta pública para testing - accesible sin autenticación
const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return element
}

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <>
      <Router>
        <Routes>
          {/* Auth Routes - Públicas para testing */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
          </Route>

          {/* Onboarding Routes - Públicas para testing */}
          <Route element={<AuthLayout />}>
            <Route 
              path="/onboarding/step1" 
              element={<PublicRoute element={<OnboardingStep1 />} />} 
            />
            <Route 
              path="/onboarding/step2" 
              element={<PublicRoute element={<OnboardingStep2 />} />} 
            />
            <Route 
              path="/onboarding/step3" 
              element={<PublicRoute element={<OnboardingStep3 />} />} 
            />
            <Route 
              path="/onboarding/step4" 
              element={<PublicRoute element={<OnboardingStep4 />} />} 
            />
          </Route>

          {/* Main App Routes - Públicas para testing */}
          <Route element={<MainLayout />}>
            <Route 
              path="/" 
              element={<PublicRoute element={<Home />} />} 
            />
            <Route 
              path="/profile" 
              element={<PublicRoute element={<Profile />} />} 
            />
            <Route 
              path="/profile/edit" 
              element={<PublicRoute element={<EditProfile />} />} 
            />
            <Route 
              path="/matches" 
              element={<PublicRoute element={<Matches />} />} 
            />
            <Route 
              path="/chat/:matchId" 
              element={<PublicRoute element={<Chat />} />} 
            />
            {/* Ruta de chat sin parámetro para testing fácil */}
            <Route 
              path="/chat" 
              element={<PublicRoute element={<Chat />} />} 
            />
            {/*  AGREGA ESTA RUTA PARA REWARDS */}
            <Route 
              path="/rewards" 
              element={<PublicRoute element={<Rewards />} />} 
            />
          </Route>

          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
      
      {/* Toaster para notificaciones */}
      <Toaster />
    </>
  )
}
# ConnectU - Hackathon TECSUP 2025

## 🎓 El Problema

**4 de cada 10 universitarios peruanos abandonan sus estudios** por:
- Dificultades académicas
- Falta de orientación vocacional  
- Aislamiento social
- Las universidades detectan esto demasiado tarde

## 💡 La Solución

**ConnectU**: Un "Tinder académico" que conecta estudiantes en riesgo con mentores mediante IA.

### Features Principales

1. **🔍 Detección Temprana de Riesgo**
   - Sistema ML analiza notas, asistencia e interacción
   - Identifica estudiantes en riesgo antes que abandonen

2. **🤝 Matching Inteligente**
   - Conecta cachimbos con mentores de ciclos avanzados
   - 3 tipos de compatibilidad:
     - **Vocacional**: Ambos quieren ser Security Engineers
     - **Académica**: Mentor aprobó el curso que cachimbo está jalando
     - **Personal**: Disponibilidad horaria e intereses comunes

3. **🎮 UX Adictiva**
   - Swipe cards como Tinder
   - Gamificación: puntos, badges, leaderboard
   - Chat en tiempo real
   - Sistema de recompensas

## 💰 Modelo de Negocio

**B2B SaaS a Universidades**
- Precio: S/. 4 por estudiante/año
- ROI brutal: Universidad de 10K alumnos
  - Paga: S/. 40,000/año
  - Retiene: S/. 15.7M en pensiones

## 🛠 Stack Técnico

### Frontend (Web App - ConnectU/)
- **React** 18 + **TypeScript**
- **Vite** (Build tool ultra-rápido)
- **Tailwind CSS** (Utility-first styling)
- **React Router** v6 (Navegación)
- **Zustand** (State Management ligero)
- **Axios** (HTTP client)
- **Lucide React** (Iconos modernos)
- **Shadcn/ui** (Componentes UI)
- **Google OAuth** (@react-oauth/google)

### Backend (Esperando integración)
- Node.js + Express / Python + FastAPI
- PostgreSQL / MongoDB
- Redis (cache)
- ML: Scikit-learn / TensorFlow
- WebSockets para chat

## 🚀 Quick Start

```bash
# Instalar dependencias
cd ConnectU
npm install

# Ejecutar en desarrollo
npm run dev
# Abre automáticamente en http://localhost:5173

# Build para producción
npm run build

# Preview del build
npm run preview
```

### 🔐 Configurar Google OAuth (Opcional)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Habilita Google OAuth API
4. Crea credenciales OAuth 2.0
5. Copia el Client ID
6. Crea archivo `.env` en `ConnectU/`:
```bash
VITE_GOOGLE_CLIENT_ID=tu-client-id-aqui.apps.googleusercontent.com
```

Ver `.env.example` para más detalles.

## 📖 Documentación Completa

### Documentos Principales
- **[RUTAS_FRONTEND.md](ConnectU/RUTAS_FRONTEND.md)** - Mapa completo de rutas y navegación
- **[TESTING_GUIDE.md](ConnectU/TESTING_GUIDE.md)** - Guía de testing y QA
- **[RESUMEN_MEJORAS.md](ConnectU/RESUMEN_MEJORAS.md)** - Resumen de mejoras implementadas

### Documentos Técnicos (Persona A)
Ver carpeta `ConnectU/` para documentación detallada:
- ✅ Análisis de diseño y feedback
- 📊 Implementación de componentes
- 🎨 Guía de animaciones y transiciones
- 🐛 Soluciones a bugs comunes
- 🎯 Checklist de features

## 🏗 Arquitectura del Proyecto

```
ConnectU/
├── src/
│   ├── api/                  # Configuración API y endpoints
│   │   ├── axios.ts          # Cliente HTTP con interceptors
│   │   ├── auth.ts           # Endpoints de autenticación
│   │   ├── users.ts          # Endpoints de usuarios
│   │   └── matches.ts        # Endpoints de matching
│   ├── components/           # Componentes reutilizables
│   │   ├── Button.tsx        # Botón con variantes (primary, outline, etc.)
│   │   ├── Input.tsx         # Input con validación y error states
│   │   ├── SwipeCard.tsx     # Card para matching estilo Tinder
│   │   ├── RiskCard.tsx      # Card de riesgo académico
│   │   ├── LoadingSkeleton.tsx   # Skeletons para loading states ✨
│   │   ├── EmptyState.tsx    # Estados vacíos profesionales ✨
│   │   ├── PageTransition.tsx    # Transiciones entre páginas ✨
│   │   ├── Navbar.tsx        # Barra de navegación
│   │   ├── Sidebar.tsx       # Sidebar de navegación
│   │   └── ui/               # Componentes Shadcn/ui
│   ├── pages/                # Páginas de la aplicación
│   │   ├── Auth/
│   │   │   ├── Login.tsx     # Login con Google OAuth ✨
│   │   │   └── Verify.tsx    # Verificación OTP
│   │   ├── Onboarding/
│   │   │   ├── Step1Basic.tsx      # Datos básicos
│   │   │   ├── Step2Academic.tsx   # Información académica
│   │   │   ├── Step3Vocational.tsx # Orientación vocacional
│   │   │   └── Step4Availability.tsx # Disponibilidad
│   │   ├── Home.tsx          # Dashboard principal
│   │   ├── Matches.tsx       # Grid de matches
│   │   ├── Profile.tsx       # Perfil de usuario ✨
│   │   ├── EditProfile.tsx   # Editar perfil + upload foto ✨
│   │   └─��� Chat.tsx          # Chat con matches
│   ├── layouts/              # Layouts de la app
│   │   ├── AuthLayout.tsx    # Layout para auth
│   │   └── MainLayout.tsx    # Layout principal con sidebar
│   ├── store/                # State management (Zustand)
│   │   ├── authStore.ts      # Estado de autenticación
│   │   └── userStore.ts      # Estado de usuario
│   ├── lib/                  # Utilidades
│   │   └── utils.ts          # Helpers y validaciones
│   ├── hooks/                # Custom hooks
│   │   └── use-toast.ts      # Hook para notificaciones
│   ├── App.tsx               # Componente raíz + routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globales + animaciones ✨
├── public/                   # Assets estáticos
├── .env.example              # Variables de entorno ejemplo
├── tailwind.config.js        # Configuración de Tailwind
├── vite.config.ts            # Configuración de Vite
└── tsconfig.json             # Configuración de TypeScript
```

## 🎯 Status del Proyecto

### ✅ Completado (Persona A - Frontend)
- [x] Setup inicial de React + Vite + TypeScript
- [x] Sistema de navegación con React Router v6
- [x] Autenticación con Google OAuth ✨
- [x] Login/Registro con email
- [x] Onboarding de 4 pasos con PageTransitions ✨
- [x] Matching con swipe cards (estilo Tinder)
- [x] Dashboard con RiskCard (detección de riesgo académico)
- [x] Profile page con mock user ✨
- [x] EditProfile con upload de foto ✨
- [x] Stores de Zustand (authStore, userStore)
- [x] Componentes UI profesionales:
  - [x] LoadingSkeleton (5 variants) ✨
  - [x] EmptyState (con iconos animados) ✨
  - [x] PageTransition (fade + slide) ✨
  - [x] Button (5 variants con animaciones)
  - [x] Input (con error shake animation) ✨
  - [x] SwipeCard (hover effects) ✨
  - [x] RiskCard (color-coded por nivel)
  - [x] Navbar y Sidebar
- [x] Animaciones CSS personalizadas ✨
  - [x] shake (errores)
  - [x] fade-in (mensajes)
  - [x] slide-up (páginas)
  - [x] pulse-glow (highlights)
- [x] Hover effects en todos los componentes ✨
- [x] TypeScript strict mode
- [x] Tailwind CSS con design system
- [x] Build optimizado (<400KB gzipped)

**Score Frontend: 94.14/100** 🏆

### 🚧 En Progreso / Próximo (Persona B - Backend & Features)
- [ ] Chat en tiempo real (WebSocket)
- [ ] Lógica de matching real (algoritmo)
- [ ] Sesiones de mentoría (calendario)
- [ ] Sistema de gamificación completo
- [ ] Notificaciones push
- [ ] Feed de recursos
- [ ] Tests unitarios
- [ ] Backend API endpoints
- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] Sistema ML de predicción de riesgo

## 🔗 Conectar con Backend

### 1. Configurar URL Base

En `src/api/axios.ts` ya está configurado:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
```

Crear archivo `.env`:
```bash
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
```

### 2. Endpoints Implementados en Frontend

#### Auth (`src/api/auth.ts`)
- `POST /auth/send-verification` - Enviar código OTP
- `POST /auth/verify` - Verificar código OTP
- `POST /auth/google` - Login con Google OAuth ✨

#### Users (`src/api/users.ts`)
- `GET /users/profile` - Obtener perfil
- `PUT /users/profile` - Actualizar perfil
- `POST /users/avatar` - Subir foto de perfil ✨

#### Matches (`src/api/matches.ts`)
- `GET /matches/candidates` - Obtener candidatos para swipe
- `POST /matches/swipe` - Registrar swipe (like/pass)
- `GET /matches` - Obtener lista de matches

### 3. Formato de Respuestas Esperadas

El backend debe responder con este formato:

```typescript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "message": "Error message",
  "errors": { ... } // opcional
}
```

Ver `src/store/authStore.ts` y `src/store/userStore.ts` para los tipos exactos.

## 📱 Demo para Hackathon

### Flow Recomendado (5 minutos)

#### 1. **Login & Auth** (30 seg)
   - Mostrar Google OAuth button ✨
   - "Continue with Google" → Login institucional
   - Validación de email .edu

#### 2. **Onboarding** (1 min)
   - 4 steps con PageTransitions suaves ✨
   - Stepper visual en header
   - Demostrar error shake en inputs ✨
   - Completar datos básicos, académicos, vocacionales

#### 3. **Home Dashboard** (1 min)
   - RiskCard mostrando nivel de riesgo académico
   - Color-coded: Verde/Amarillo/Naranja/Rojo
   - Quick actions con hover effects ✨
   - Stats: matches, study hours, badges

#### 4. **Matching** (1.5 min)
   - SwipeCards estilo Tinder
   - Hover sobre cards → escala + shadow ✨
   - Mostrar compatibilidad (%, tipo de match)
   - Swipe right (Connect) / left (Pass)
   - Animaciones suaves ✨

#### 5. **Profile & Edit** (1 min)
   - Ver perfil con avatar ✨
   - Click "Edit Profile"
   - Hover sobre avatar → "Change Photo" ✨
   - Upload foto con preview instantáneo ✨
   - Guardar cambios → Confirmación

#### 6. **Matches** (30 seg)
   - Grid de matches exitosos
   - Click "Start Chat" (mock data)
   - EmptyState si no hay matches ✨

### Screenshots Clave
- Login con Google OAuth
- Onboarding step con stepper
- Home con RiskCard rojo (critical)
- SwipeCard con hover effect
- Profile con foto subida
- EditProfile con overlay "Change Photo"

### Puntos a Destacar
✨ **Animaciones suaves** - PageTransitions, hover effects, shake errors  
🔐 **Google OAuth** - Seguridad institucional  
🎨 **Diseño moderno** - Paleta morada, gradientes, shadows  
📸 **Upload de foto** - Preview instantáneo, validación  
🎯 **UX intuitiva** - Swipe natural, feedback visual claro

## 🤝 División de Trabajo

### Persona A - Frontend (Completado ✅)
**Responsabilidades:**
- Diseño visual y estética
- Animaciones y micro-interacciones
- Componentes UI reutilizables
- Login, Onboarding, Profile, EditProfile
- Google OAuth
- Upload de foto de perfil
- PageTransitions y loading states

**Entregables:**
- 3 componentes nuevos (LoadingSkeleton, EmptyState, PageTransition)
- 5 componentes mejorados con animaciones
- 4 animaciones CSS personalizadas
- 9 páginas con PageTransition
- Sistema de upload de fotos
- Mock users para testing
- Documentación completa

### Persona B - Backend & Matching (Pendiente)
**Responsabilidades:**
- Lógica de matching (algoritmo)
- Chat en tiempo real (WebSocket)
- API endpoints
- Base de datos
- Sistema ML de predicción
- Autenticación backend
- Sesiones de mentoría

**Por implementar:**
- API REST completa
- WebSocket server para chat
- Algoritmo de compatibilidad
- Sistema de gamificación
- Notificaciones
- Tests backend

## 🤝 Equipo

- **Frontend Lead**: Persona A (React + TypeScript + Design)
- **Backend Lead**: Persona B (Node.js/Python + DB + ML)
- **ML/AI**: Data Scientist (Algoritmo de matching)
- **Design**: UI/UX Designer (Wireframes y mockups)




---

**¡Hagamos que ningún estudiante abandone por falta de apoyo!** 🚀🎓

# ConnectU - Hackathon TECSUP 2024

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

### Frontend (Esta App)
- **React Native** + Expo
- **NativeWind** (Tailwind CSS para RN)
- **Zustand** (State Management)
- **React Navigation**
- **Axios** + TanStack Query
- **TypeScript**

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
npm start

# Opciones específicas
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Navegador (testing rápido)
```

## 📖 Documentación Completa

Ver [IMPLEMENTATION_SUMMARY.md](ConnectU/IMPLEMENTATION_SUMMARY.md) para:
- ✅ Checklist de features implementadas
- 📡 Lista completa de endpoints
- 🔧 Guía de configuración
- 🎨 Guía de diseño
- 🐛 Troubleshooting
- 🎯 Plan para la hackathon

## 🏗 Arquitectura del Proyecto

```
ConnectU/
├── src/
│   ├── api/              # Configuración API y endpoints
│   │   ├── axios.ts      # Cliente HTTP con interceptors
│   │   ├── endpoints.ts  # Todos los endpoints del backend
│   │   └── types.ts      # Types TypeScript
│   ├── components/       # Componentes reutilizables
│   │   ├── chat/         # Componentes de chat
│   │   ├── matching/     # Componentes de matching
│   │   ├── profile/      # Componentes de perfil
│   │   └── ui/           # Componentes UI base
│   ├── hooks/            # Custom hooks
│   ├── navigation/       # Configuración de navegación
│   ├── screens/          # Pantallas de la app
│   │   └── screens/
│   │       ├── auth/     # Pantallas de autenticación
│   │       ├── main/     # Pantallas principales
│   │       └── sessions/ # Pantallas de sesiones
│   ├── store/            # State management (Zustand)
│   │   ├── authStore.ts  # Estado de autenticación
│   │   └── matchStore.ts # Estado de matching
│   ├── types/            # Types adicionales
│   └── utils/            # Utilidades y constantes
└── App.tsx               # Componente raíz
```

## 🎯 Status del Proyecto

### ✅ Completado
- [x] Setup inicial de React Native + Expo
- [x] Sistema de navegación completo
- [x] Autenticación con email OTP
- [x] Onboarding de 4 pasos
- [x] Matching con swipe cards
- [x] Stores de Zustand
- [x] Integración con API (endpoints listos)
- [x] Componentes UI base
- [x] TypeScript types alineados con backend

### 🚧 En Progreso / Próximo
- [ ] Chat en tiempo real (WebSocket)
- [ ] Sesiones de mentoría (calendario)
- [ ] Sistema de gamificación completo
- [ ] Notificaciones push
- [ ] Feed de recursos
- [ ] Tests unitarios

## 🔗 Conectar con Backend

1. **Configura la URL en** `src/utils/constants.ts`:
```typescript
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // Development
  : 'https://api.connectu.pe/api';  // Production
```

2. **El frontend ya tiene todos los endpoints implementados**:
   - Auth (login, verify, onboarding)
   - User (profile, update, upload image)
   - Matching (candidates, swipe, matches)
   - Chat (messages, send, read)
   - Sessions (create, complete, cancel)
   - Feed (resources, like/unlike)
   - Gamification (progress, leaderboard)
   - Notifications (list, read, delete)

3. **El backend debe responder con el formato especificado** en los types

## 📱 Demo para Hackathon

1. **Welcome Screen** - Branding y problema
2. **Auth Flow** - Email OTP + Onboarding completo
3. **Home Dashboard** - Riesgo académico, quick actions
4. **Matching** - Swipe en mentores con alta compatibilidad
5. **Match Modal** - Celebración del match
6. **Chat** - Conversar con mentor
7. **Session** - Agendar mentoría
8. **Gamification** - Puntos, nivel, badges

## 🤝 Equipo

- Frontend: React Native Developer
- Backend: Node.js/Python Developer
- ML/AI: Data Scientist
- Design: UI/UX Designer

## 📞 Contacto

Para soporte durante la hackathon, revisar [IMPLEMENTATION_SUMMARY.md](ConnectU/IMPLEMENTATION_SUMMARY.md)

---

**¡Hagamos que ningún estudiante abandone por falta de apoyo!** 🚀🎓

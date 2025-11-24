#!/usr/bin/env python3
"""
🧪 ConnectU API Testing Suite
Script interactivo para probar todos los endpoints del backend
"""

import requests
import json
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
BASE_URL = "http://127.0.0.1:8000"
HEADERS = {"Content-Type": "application/json"}

class Colors:
    """Colors for terminal output"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    END = '\033[0m'

class APITester:
    def __init__(self):
        self.token = None
        self.current_user = None
        
    def print_header(self, title):
        """Print a formatted header"""
        print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.END}")
        print(f"{Colors.BOLD}{Colors.BLUE}🧪 {title}{Colors.END}")
        print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.END}")
    
    def print_success(self, message):
        """Print success message"""
        print(f"{Colors.GREEN}✅ {message}{Colors.END}")
    
    def print_error(self, message):
        """Print error message"""
        print(f"{Colors.RED}❌ {message}{Colors.END}")
    
    def print_info(self, message):
        """Print info message"""
        print(f"{Colors.CYAN}ℹ️  {message}{Colors.END}")
    
    def print_warning(self, message):
        """Print warning message"""
        print(f"{Colors.YELLOW}⚠️  {message}{Colors.END}")
    
    def make_request(self, method, endpoint, data=None, use_auth=False):
        """Make HTTP request"""
        url = f"{BASE_URL}{endpoint}"
        headers = HEADERS.copy()
        
        if use_auth and self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        
        try:
            if method == "GET":
                response = requests.get(url, headers=headers)
            elif method == "POST":
                response = requests.post(url, headers=headers, json=data)
            elif method == "PATCH":
                response = requests.patch(url, headers=headers, json=data)
            elif method == "DELETE":
                response = requests.delete(url, headers=headers)
            else:
                self.print_error(f"Método HTTP no soportado: {method}")
                return None
            
            # Print request details
            print(f"\n{Colors.BOLD}📤 REQUEST:{Colors.END}")
            print(f"   {method} {url}")
            if data:
                print(f"   Data: {json.dumps(data, indent=2)}")
            
            # Print response details
            print(f"\n{Colors.BOLD}📥 RESPONSE:{Colors.END}")
            print(f"   Status: {response.status_code}")
            
            try:
                response_data = response.json()
                print(f"   Data: {json.dumps(response_data, indent=2, default=str)}")
                
                if response.status_code < 400:
                    self.print_success(f"Request successful ({response.status_code})")
                else:
                    self.print_error(f"Request failed ({response.status_code})")
                
                return response_data
            except:
                print(f"   Data: {response.text}")
                return {"status_code": response.status_code, "text": response.text}
                
        except requests.exceptions.ConnectionError:
            self.print_error("❌ No se pudo conectar al servidor. ¿Está corriendo en http://127.0.0.1:8000?")
        except Exception as e:
            self.print_error(f"Error en la petición: {str(e)}")
        
        return None
    
    def test_auth_send_verification(self):
        """Test: Send verification code"""
        self.print_header("AUTH: Send Verification Code")
        
        email = input("📧 Ingresa email (@utec.edu.pe): ").strip()
        if not email:
            email = "miguel.test@utec.edu.pe"
            print(f"Usando email por defecto: {email}")
        
        data = {"email": email}
        response = self.make_request("POST", "/auth/send-verification", data)
        
        if response and response.get("success"):
            self.print_success("Código enviado correctamente")
            return True
        return False
    
    def test_auth_verify(self):
        """Test: Verify code and get token"""
        self.print_header("AUTH: Verify Code")
        
        email = input("📧 Email: ").strip()
        if not email:
            email = "miguel.test@utec.edu.pe"
            print(f"Usando email por defecto: {email}")
        
        code = input("🔑 Código de verificación (6 dígitos): ").strip()
        if not code:
            # Para testing, buscar en la base de datos o usar un código dummy
            self.print_warning("Usando código de ejemplo. En producción, ingresa el código real del email.")
            code = "123456"
        
        data = {"email": email, "code": code}
        response = self.make_request("POST", "/auth/verify", data)
        
        if response and response.get("success") and response.get("token"):
            self.token = response["token"]
            self.current_user = response.get("user")
            self.print_success(f"✅ Autenticado como: {self.current_user.get('email')}")
            self.print_info(f"Token guardado: {self.token[:20]}...")
            return True
        
        self.print_error("No se pudo autenticar")
        return False
    
    def test_auth_onboarding(self):
        """Test: Complete onboarding"""
        self.print_header("AUTH: Complete Onboarding")
        
        if not self.token:
            self.print_error("Necesitas estar autenticado primero")
            return False
        
        # Datos de ejemplo
        data = {
            "firstName": "Miguel",
            "lastName": "Sanchez",
            "career": "Computer Science",
            "semester": 3,
            "university": "UTEC",
            "careerInterests": ["Ciberseguridad", "DevOps"],
            "futureRoles": ["Security Engineer", "DevOps Engineer"],
            "industryPreference": ["Tech", "Fintech"],
            "skillsToLearn": ["Pentesting", "Docker", "AWS"],
            "weaknesses": ["Cálculo 2", "Física 1"],
            "strengths": ["Programación", "Base de Datos"],
            "studyStyle": "practical",
            "availableTimes": {
                "monday": ["14:00-16:00", "18:00-20:00"],
                "tuesday": ["16:00-18:00"],
                "wednesday": ["14:00-16:00"],
                "thursday": [],
                "friday": ["18:00-22:00"],
                "saturday": ["10:00-14:00"],
                "sunday": []
            }
        }
        
        response = self.make_request("POST", "/auth/onboarding", data, use_auth=True)
        
        if response and response.get("success"):
            self.print_success("Onboarding completado correctamente")
            return True
        return False
    
    def test_users_me(self):
        """Test: Get my profile"""
        self.print_header("USER: Get My Profile")
        
        if not self.token:
            self.print_error("Necesitas estar autenticado primero")
            return False
        
        response = self.make_request("GET", "/users/me", use_auth=True)
        
        if response:
            self.print_success("Perfil obtenido correctamente")
            return True
        return False
    
    def test_users_update(self):
        """Test: Update profile"""
        self.print_header("USER: Update Profile")
        
        if not self.token:
            self.print_error("Necesitas estar autenticado primero")
            return False
        
        data = {
            "bio": "Apasionado por ciberseguridad. Actualmente mejorando en Cálculo 2.",
            "careerInterests": ["Ciberseguridad", "Cloud Computing", "DevOps"],
            "availableTimes": {
                "monday": ["14:00-16:00"],
                "tuesday": ["16:00-18:00"]
            }
        }
        
        response = self.make_request("PATCH", "/users/me", data, use_auth=True)
        
        if response and response.get("success"):
            self.print_success("Perfil actualizado correctamente")
            return True
        return False
    
    def test_users_grades(self):
        """Test: Add grades"""
        self.print_header("USER: Add Grades")
        
        if not self.token:
            self.print_error("Necesitas estar autenticado primero")
            return False
        
        data = {
            "grades": [
                {
                    "courseName": "Cálculo 1",
                    "grade": 17,
                    "semester": "2024-1",
                    "status": "approved"
                },
                {
                    "courseName": "Cálculo 2",
                    "grade": 12,
                    "semester": "2024-2",
                    "status": "in_progress"
                },
                {
                    "courseName": "Programación Orientada a Objetos",
                    "grade": 20,
                    "semester": "2024-1",
                    "status": "approved"
                }
            ]
        }
        
        response = self.make_request("POST", "/users/me/grades", data, use_auth=True)
        
        if response and response.get("success"):
            self.print_success(f"✅ Calificaciones agregadas. GPA: {response.get('gpa')}")
            return True
        return False
    
    def test_get_users(self):
        """Test: Get all users (existing endpoint)"""
        self.print_header("USER: Get All Users")
        
        response = self.make_request("GET", "/users")
        
        if response:
            self.print_success(f"Usuarios obtenidos: {len(response)} usuarios")
            return True
        return False
    
    def run_full_auth_flow(self):
        """Run complete authentication flow"""
        self.print_header("🔄 FLUJO COMPLETO DE AUTENTICACIÓN")
        
        print("1️⃣  Enviando código de verificación...")
        if not self.test_auth_send_verification():
            return False
        
        input("\n⏳ Presiona ENTER cuando tengas el código de verificación...")
        
        print("\n2️⃣  Verificando código...")
        if not self.test_auth_verify():
            return False
        
        print("\n3️⃣  Completando onboarding...")
        if not self.test_auth_onboarding():
            return False
        
        print("\n4️⃣  Obteniendo perfil...")
        self.test_users_me()
        
        self.print_success("🎉 Flujo completo de autenticación terminado!")
        return True
    
    def run_user_tests(self):
        """Run all user-related tests"""
        self.print_header("👤 TESTS DE USUARIO")
        
        if not self.token:
            self.print_error("Necesitas estar autenticado primero")
            return
        
        print("1️⃣  Obteniendo perfil...")
        self.test_users_me()
        
        print("\n2️⃣  Actualizando perfil...")
        self.test_users_update()
        
        print("\n3️⃣  Agregando calificaciones...")
        self.test_users_grades()
        
        print("\n4️⃣  Verificando perfil actualizado...")
        self.test_users_me()
        
        self.print_success("🎉 Tests de usuario completados!")
    
    def show_menu(self):
        """Show main menu"""
        while True:
            print(f"\n{Colors.BOLD}{Colors.MAGENTA}{'='*60}")
            print("🧪 CONNECTU API TESTING SUITE")
            print(f"{'='*60}{Colors.END}")
            
            if self.token:
                print(f"{Colors.GREEN}🔐 Autenticado como: {self.current_user.get('email', 'Usuario')}{Colors.END}")
            else:
                print(f"{Colors.RED}🔓 No autenticado{Colors.END}")
            
            print(f"\n{Colors.BOLD}📋 OPCIONES DISPONIBLES:{Colors.END}")
            print("1.  🔄 Flujo completo de autenticación")
            print("2.  📧 Enviar código de verificación")
            print("3.  🔑 Verificar código (obtener token)")
            print("4.  📝 Completar onboarding")
            print("5.  👤 Ver mi perfil")
            print("6.  ✏️  Actualizar perfil")
            print("7.  📊 Agregar calificaciones")
            print("8.  👥 Ver todos los usuarios")
            print("9.  🧪 Ejecutar tests de usuario")
            print("10. 🔧 Cambiar URL base")
            print("11. 🗑️  Limpiar token (logout)")
            print("0.  ❌ Salir")
            
            choice = input(f"\n{Colors.YELLOW}Selecciona una opción (0-11): {Colors.END}").strip()
            
            if choice == "0":
                print(f"{Colors.GREEN}👋 ¡Hasta luego!{Colors.END}")
                break
            elif choice == "1":
                self.run_full_auth_flow()
            elif choice == "2":
                self.test_auth_send_verification()
            elif choice == "3":
                self.test_auth_verify()
            elif choice == "4":
                self.test_auth_onboarding()
            elif choice == "5":
                self.test_users_me()
            elif choice == "6":
                self.test_users_update()
            elif choice == "7":
                self.test_users_grades()
            elif choice == "8":
                self.test_get_users()
            elif choice == "9":
                self.run_user_tests()
            elif choice == "10":
                new_url = input("Nueva URL base (actual: {BASE_URL}): ").strip()
                if new_url:
                    global BASE_URL
                    BASE_URL = new_url
                    self.print_success(f"URL cambiada a: {BASE_URL}")
            elif choice == "11":
                self.token = None
                self.current_user = None
                self.print_success("Token eliminado. Desautenticado.")
            else:
                self.print_error("❌ Opción no válida")
            
            input(f"\n{Colors.CYAN}Presiona ENTER para continuar...{Colors.END}")

def main():
    """Main function"""
    print(f"{Colors.BOLD}{Colors.CYAN}")
    print("🚀 ConnectU API Testing Suite")
    print("Asegúrate de que tu servidor esté corriendo en http://127.0.0.1:8000")
    print(f"{Colors.END}")
    
    # Check if server is running
    try:
        response = requests.get(f"{BASE_URL}/docs", timeout=5)
        print(f"{Colors.GREEN}✅ Servidor detectado y funcionando{Colors.END}")
    except:
        print(f"{Colors.RED}❌ No se puede conectar al servidor en {BASE_URL}")
        print("   Asegúrate de ejecutar: uvicorn app.main:app --reload")
        print(f"{Colors.END}")
        return
    
    tester = APITester()
    tester.show_menu()

if __name__ == "__main__":
    main()
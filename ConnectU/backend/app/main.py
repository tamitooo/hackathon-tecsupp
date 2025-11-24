import os
import sendgrid
from sendgrid.helpers.mail import Mail
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from dotenv import load_dotenv
from datetime import datetime, timedelta

from app.utils import *
from app.models import *
from app.services import get_candidates


load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


# SendGrid configuration
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDGRID_SENDER  = os.getenv("SENDGRID_SENDER")

sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)


# JWT Configuration
JWT_EXPIRES_IN = os.getenv("JWT_EXPIRES_IN")


app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/auth/send-verification")
def send_verification(data: EmailRequest):
    email = data.email

    # Validate email domain
    if not is_valid_email(email):
        raise HTTPException(status_code=400, detail="Email no válido o dominio no permitido")

    # Rate limiting: check last code sent time
    last_code = (
        supabase.table("auth_code")
        .select("*")
        .eq("email", email)
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )

    if last_code.data:
        created_at = datetime.fromisoformat(last_code.data[0]["created_at"].replace("Z", ""))
        diff = datetime.utcnow() - created_at

        if diff.total_seconds() < 60:
            raise HTTPException(status_code=429, detail="Demasiados intentos, espera 60 segundos")

    # Generate verification code
    code = generate_code()
    expires_at = datetime.utcnow() + timedelta(seconds=int(JWT_EXPIRES_IN))

    # Store code in the database
    supabase.table("auth_code").delete().eq("email", email).execute()

    supabase.table("auth_code").insert({
        "email": email,
        "code": code,
        "expires_at": expires_at.isoformat()
    }).execute()

    # Send email with SendGrid
    message = Mail(
        from_email=SENDGRID_SENDER,
        to_emails=email,
        subject="Your Verification Code",
        html_content=f"<h1>{code}</h1><p>Your verification code expires in {JWT_EXPIRES_IN} seconds.</p>"
    )

    try:
        sg.send(message)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error sending email")

    return {
        "success": True,
        "message": f"Código enviado a {email}",
        "expires_in": JWT_EXPIRES_IN
    }


@app.post("/auth/verify")
def verify(data: VerifyRequest):
    email = data.email
    code  = data.code

    # Verify if the email exists
    record = (
        supabase.table("auth_code")
        .select("*")
        .eq("email", email)
        .execute()
    )

    if not record.data:
        raise HTTPException(status_code=404, detail="Email no encontrado")

    # Verify if the code matches
    if record.data[0]["code"] != code:
        raise HTTPException(status_code=400, detail="Código inválido")
    
    # Verify if the code has expired
    expires_at = datetime.fromisoformat(record.data[0]["expires_at"].replace("Z", ""))
    if datetime.utcnow() > expires_at:
        raise HTTPException(status_code=400, detail="Código expirado")

    # Get or create user
    user_record = (
        supabase.table("users")
        .select("*")
        .eq("email", email)
        .execute()
    )

    supabase.table("auth_code").delete().eq("email", email).execute()

    if not user_record.data:
        user = supabase.table("users").insert({
            "email": email
        }).execute().data[0]

        return {
        "success": True,
        "data": {
            "token": f"fake-jwt-token-{user['id']}",
            "user": {
                "id": f"uuid-{user['id']}",
                "email": user["email"],
                "firstName": None,
                "lastName": None,
                "university": None,
                "career": None,
                "semester": None,
                "avatar": None,
                "bio": None
            },
            "onboardingCompleted": False
        }
    }


    user = user_record.data[0]

    return {
        "success": True,
        "data": {
            "token": f"fake-jwt-token-{user['id']}",  # Generate proper JWT if needed
            "user": {
                "id": f"uuid-{user['id']}",
                "email": user['email'],
                "firstName": user['firstName'],
                "lastName": user['lastName'],
                "university": user.get('university'),
                "career": user.get('career'),
                "semester": user.get('semester'),
                "avatar": user.get('profileimage'),
                "bio": user.get('bio')
            },
            "onboardingCompleted": user['onboardingCompleted']
        }
    }


@app.post("/auth/onboarding")
def onboarding(data: OnboardingRequest):
    user_id = data.user_id
    
    # Update user basic info
    user_update = supabase.table("users").update({
        "firstname": data.firstName,
        "lastname": data.lastName,
        "university": data.university,
        "career": data.career,
        "semester": data.semester,
        "onboardingCompleted": True
    }).eq("id", user_id).execute()
    
    # Update or create user profile
    profile_data = {
        "user_id": user_id,
        "bio": data.bio,
        "careerinterests": data.interests,
        "studystyle": data.studyStyle,
        "availabletimes": data.availability,
        "futureroles": data.futureRoles or [],
        "strengths": data.strengths or [],
        "weaknesses": data.weaknesses or []
    }
    
    # Try to update existing profile, if not exists, insert
    existing_profile = supabase.table("user_profiles").select("*").eq("user_id", user_id).execute()
    
    if existing_profile.data:
        supabase.table("user_profiles").update(profile_data).eq("user_id", user_id).execute()
    else:
        supabase.table("user_profiles").insert(profile_data).execute()
    
    user = user_update.data[0]
    
    return {
        "success": True,
        "data": {
            "user": {
                "id": f"uuid-{user['id']}",
                "email": user['email'],
                "firstName": user['firstname'],
                "lastName": user['lastname'],
                "university": user['university'],
                "career": user['career'],
                "semester": user['semester'],
                "avatar": user.get('profileimage'),
                "bio": data.bio
            }
        }
    }


@app.get("/users/me")
def get_me(user_id: int = Query(...)):
    user_response = supabase.table("users").select("*, user_profiles(*)").eq("id", user_id).execute()
    
    if not user_response.data:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = user_response.data[0]
    profile = user.get('user_profiles', {})
    
    return {
        "success": True,
        "data": {
            "id": f"uuid-{user['id']}",
            "email": user['email'],
            "firstName": user.get('firstname'),
            "lastName": user.get('lastname'), 
            "university": user.get('university'),
            "career": user.get('career'),
            "semester": user.get('semester'),
            "avatar": user.get('profileimage'),
            "bio": profile.get('bio') if profile else None
        }
    }


@app.patch("/users/me") 
def update_me(data: UpdateUserRequest):
    user_id = data.user_id
    
    # Update user table
    user_updates = {}
    if hasattr(data, 'firstName') and data.firstName:
        user_updates['firstname'] = data.firstName
    if hasattr(data, 'lastName') and data.lastName:
        user_updates['lastname'] = data.lastName
    if hasattr(data, 'university') and data.university:
        user_updates['university'] = data.university
    if hasattr(data, 'career') and data.career:
        user_updates['career'] = data.career
    if hasattr(data, 'semester') and data.semester:
        user_updates['semester'] = data.semester
        
    if user_updates:
        supabase.table("users").update(user_updates).eq("id", user_id).execute()
    
    # Update profile table
    profile_updates = {}
    if hasattr(data, 'bio') and data.bio:
        profile_updates['bio'] = data.bio
        
    if profile_updates:
        supabase.table("user_profiles").update(profile_updates).eq("user_id", user_id).execute()
    
    # Get updated user
    user_response = supabase.table("users").select("*, user_profiles(*)").eq("id", user_id).execute()
    user = user_response.data[0]
    profile = user.get('user_profiles', {})
    
    return {
        "success": True,
        "data": {
            "id": f"uuid-{user['id']}",
            "email": user['email'],
            "firstName": user.get('firstname'),
            "lastName": user.get('lastname'),
            "university": user.get('university'),
            "career": user.get('career'),
            "semester": user.get('semester'),
            "avatar": user.get('profileimage'),
            "bio": profile.get('bio') if profile else None
        }
    }


@app.get("/matches/candidates")
def get_match_candidates(
    user_id: int = Query(...),
    limit: int = Query(20),
    offset: int = Query(0)
):
    result = get_candidates(user_id, limit=limit, offset=offset, supabase=supabase)
    
    # Formatear para que coincida con lo que espera el frontend
    return {
        "success": True,
        "data": result["candidates"]
    }


@app.post("/matches/request")
def match_request(data: MatchRequest):
    user_id             = data.user_id
    candidate_id        = data.candidate_id
    candidate_name      = data.candidate_name
    message             = data.message
    compatibility_score = data.compatibility_score

    # Insert match request into the database
    response = supabase.table("matches").insert({
        "mentee_id": user_id,
        "mentor_id": candidate_id,
        "message": message,
        "compatibility_score": compatibility_score,
    })

    if response.error:
        raise HTTPException(status_code=500, detail="Error creating match request")
    
    match_data = response.execute().data[0]

    return {
        "success": True,
        "match": {
            "id": match_data["id"],
            "mentee_id": match_data["mentee_id"],
            "mentor_id": match_data["mentor_id"],
            "message": match_data["message"],
            "compatibility_score": match_data["compatibility_score"],
            "created_at": match_data["created_at"]
        },
        "message": f"Solicitud enviada a {candidate_name}. Te notificaremos cuando responda."
    }


@app.get("/matches/skip")
def match_skip():
    return {
        "success": True,
        "message": "Candidato omitido. Mostrando siguiente."
    }


@app.post("/matches/my-matches")
def get_matches(
    data: UserRequest,
    status: str = Query("all"),
    role: str = Query("all")
):
    user_id = data.user_id
    
    # Build filters
    query = supabase.table("matches").select("*")

    if status != "all":
        query = query.eq("status", status)
    
    if role == "mentor":
        query = query.eq("mentor_id", user_id)
    elif role == "mentee":
        query = query.eq("mentee_id", user_id)
    else:
        query = query.or_(f"mentor_id.eq.{user_id},mentee_id.eq.{user_id}")
    
    # Execute
    response = query.execute()
    matches = response.data

    full_matches = []
    status_count = {
        "pending": 0,
        "active": 0,
        "completed": 0
    }

    for m in matches:
        if m["status"] in status_count:
            status_count[m["status"]] += 1
        
        if m["mentee_id"] == user_id:
            other_user_id = m["mentor_id"]
        else:
            other_user_id = m["mentee_id"]
        
        user_response = (
            supabase.table("users")
            .select("*")
            .eq("id", other_user_id)
            .execute()
        )

        if not user_response.data:
            continue
            
        other_user = user_response.data[0]

        # Mock
        last_message = {
            "content": "Último mensaje de prueba",
            "sentAt": "2024-11-02T10:20:00Z",
            "isRead": True
        }

        upcoming_session = {
            "id": "session-mock-1",
            "scheduledAt": "2024-11-06T16:00:00Z",
            "duration": 60
        }

        stats = {
            "totalSessions": 2,
            "totalMessages": 15
        }

        full_matches.append({
            "id": m["id"],
            "status": m["status"],
            "matchType": m["match_type"],
            "compatibilityScore": m["compatibility_score"],
            "createdAt": m["created_at"],
            "acceptedAt": m["accepted_at"],
            "otherUser": {
                "id": other_user["id"],
                "firstName": other_user["firstname"],
                "lastName": other_user["lastname"][0] + '.',
                "profileImage": other_user["profileimage"],
                "career": other_user["career"],
                "semester": other_user["semester"],
            },
            "lastMessage": last_message,
            "upcomingSession": upcoming_session,
            "stats": stats
        })
    
    return {
        "matches": full_matches,
        "counts": status_count
    }


@app.post("/matches/{match_id}/respond")
def respond_match(
    match_id: str,
    data: MatchRespondRequest
):
    match_res = (
        supabase.table("matches")
        .select("*")
        .eq("id", match_id)
        .execute()
    )

    if not match_res.data:
        raise HTTPException(status_code=404, detail="Match not found")
    
    user_id = data.user_id
    action = data.action
    message = data.message
    match_data = match_res.data[0]

    if match_data["mentor_id"] != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized action")
    
    new_status = "accepted" if action == "accept" else "rejected"
    update_data = {
        "status": new_status,
        "message": message or None,
        "accepted_at": None,
    }

    if action == "accept":
        update_data["accepted_at"] = datetime.utcnow().isoformat()
    
    update_res = (
        supabase.table("matches")
        .update(update_data)
        .eq("id", match_id)
        .execute()
    )

    updated_match = update_res.data[0]

    points_earned = 50 if action == "accept" else 0

    return {
        "success": True,
        "match": {
            "id": updated_match["id"],
            "status": updated_match["status"],
            "acceptedAt": updated_match["accepted_at"],
        },
        "pointsEarned": points_earned,
        "message": (
            "Match aceptado! Ahora pueden chatear y agendar sesiones."
            if action == "accept"
            else "Has rechazado la solicitud."
        )   
    }
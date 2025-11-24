from pydantic import BaseModel, EmailStr
from typing import Optional, List

class EmailRequest(BaseModel):
    email: EmailStr

class VerifyRequest(BaseModel):
    email: EmailStr
    code: str

class UserRequest(BaseModel):
    user_id: int

class OnboardingRequest(BaseModel):
    user_id: int
    firstName: str
    lastName: str
    university: str
    career: str
    semester: int
    bio: Optional[str] = None
    interests: Optional[List[str]] = []
    studyStyle: Optional[str] = None
    availability: Optional[List[str]] = []
    futureRoles: Optional[List[str]] = []
    strengths: Optional[List[str]] = []
    weaknesses: Optional[List[str]] = []

class UpdateUserRequest(BaseModel):
    user_id: int
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    university: Optional[str] = None
    career: Optional[str] = None
    semester: Optional[int] = None
    bio: Optional[str] = None

class MatchRequest(BaseModel):
    user_id: int
    candidate_id: int
    candidate_name: str
    message: Optional[str] = None
    match_type: Optional[str] = 'MENTOR'
    compatibility_score: Optional[int] = 0

class MatchRespondRequest(BaseModel):
    user_id: int
    action: str
    message: Optional[str] = None
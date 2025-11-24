import random

def generate_code() -> str:
    # Create a random 6-digit verification code: 000000 to 999999
    return f"{random.randint(0, 999999):06}"

def is_valid_email(email: str) -> bool:
    return email.endswith("@utec.edu.pe")

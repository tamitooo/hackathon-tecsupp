from sentence_transformers import SentenceTransformer, util

# Embedder instance and weights for different criteria
embedder = SentenceTransformer("intfloat/multilingual-e5-small")
WEIGHTS = {
    "weakness_support": 3.0,
    "interest_semantic": 2.0,
    "future_roles_semantic": 1.5,
    "study_style": 1.2,
    "bio_semantic": 1.0,
    "career_match": 0.8,
    "semester_advantage": 0.5,
}


# Get functions
def get_mentors(user_id: int, supabase: any):
    response = (
        supabase.table("user_grades")
        .select("*, users!inner(*, user_profiles(*))")
        .eq("status", "approved")
        .neq("user_id", user_id)
        .execute()
    )

    mentors = []
    for record in response.data:
        user = record['users']
        user_profile = user['user_profiles']

        mentor = {
            'coursename': record['coursename'],
            'grade': record['grade'],
            'id': f"uuid-{user['id']}",
            'firstName': user['firstname'],
            'lastName': user['lastname'],
            'career': user['career'],
            'semester': user['semester'],
            'profileimage': user['profileimage'],
            'bio': user_profile['bio'],
            'strengths': user_profile['strengths'],
            'futureroles': user_profile['futureroles'],
            'studystyle': user_profile['studystyle'],
            'availabletimes': user_profile['availabletimes'],
            'careerinterests': user_profile['careerinterests']
        }

        mentors.append(mentor)
    
    grouped = {}

    for m in mentors:
        name = m["firstName"]

        if name not in grouped:
            grouped[name] = {
                "id": m["id"],
                "firstName": m["firstName"],
                "lastName": m["lastName"],
                "career": m["career"],
                "semester": m["semester"],
                "profileImage": m["profileimage"],
                "bio": m["bio"],
                "strengths": m["strengths"],
                "futureroles": m["futureroles"],
                "studystyle": m["studystyle"],
                "availabletimes": m["availabletimes"],
                "careerinterests": m["careerinterests"],
                "courses": []
            }

        grouped[name]["courses"].append({
            "coursename": m["coursename"],
            "grade": m["grade"]
        })
    
    return {"mentors": list(grouped.values())}

def get_user_profile(user_id: int, supabase: any):
    response = (
        supabase.table("users")
        .select("*, user_profiles(*)")
        .eq("id", user_id)
        .execute()
    )

    user = response.data[0]

    return {
        'career': user['career'],
        'semester': user['semester'],
        'bio': user['user_profiles']['bio'],
        'weaknesses': user['user_profiles']['weaknesses'],
        'futureroles': user['user_profiles']['futureroles'],
        'studystyle': user['user_profiles']['studystyle'],
        'availabletimes': user['user_profiles']['availabletimes'],
        'careerinterests': user['user_profiles']['careerinterests']
    }

def extract_common_interests(user, mentor):
    ui = set(user.get("careerinterests", []))
    mi = set(mentor.get("careerinterests", []))
    return list(ui & mi)


# Similarity functions
def text_list_similarity(list1, list2):
    if not list1 or not list2:
        return 0.0

    sims = []
    for t1 in list1:
        emb1 = embedder.encode(t1, normalize_embeddings=True)
        for t2 in list2:
            emb2 = embedder.encode(t2, normalize_embeddings=True)
            sims.append(float(util.cos_sim(emb1, emb2)))

    if not sims:
        return 0.0

    # Return average similarity
    return sum(sims) / len(sims)

def compute_embedding_similarity(text1, text2):
    emb1 = embedder.encode(text1, normalize_embeddings=True)
    emb2 = embedder.encode(text2, normalize_embeddings=True)
    return float(util.cos_sim(emb1, emb2))


# Matching function
def match_user_to_mentors(user, mentors):
    results = []

    for mentor in mentors:
        score = 0
        reasons = []

        # ------------------------------------------------------
        # 1. Weakness support
        # ------------------------------------------------------
        if "weaknesses" in user and "courses" in mentor:
            mentor_courses = {c["coursename"].lower(): c["grade"] for c in mentor["courses"]}

            for weak in user["weaknesses"]:
                w = weak.lower()
                if w in mentor_courses and mentor_courses[w] >= 15:
                    score += WEIGHTS["weakness_support"]
                    reasons.append(f"El mentor tiene buena calificación en {weak}.")

        # ------------------------------------------------------
        # 2. Interest semantic
        # ------------------------------------------------------
        interest_sim = text_list_similarity(
            user.get("careerinterests", []),
            mentor.get("careerinterests", [])
        )
        if interest_sim > 0.3:
            score += interest_sim * WEIGHTS["interest_semantic"]
            reasons.append(f"Alta similitud semántica en intereses ({interest_sim:.2f}).")

        # ------------------------------------------------------
        # 3. Future roles semantic
        # ------------------------------------------------------
        roles_sim = text_list_similarity(
            user.get("futureroles", []),
            mentor.get("futureroles", [])
        )
        if roles_sim > 0.3:
            score += roles_sim * WEIGHTS["future_roles_semantic"]
            reasons.append(f"Similitud en roles futuros ({roles_sim:.2f}).")

        # ------------------------------------------------------
        # 4. Study style
        # ------------------------------------------------------
        if user["studystyle"] == mentor["studystyle"]:
            score += WEIGHTS["study_style"]
            reasons.append(f"Ambos tienen un estilo de estudio similar: {user['studystyle']}.")

        # ------------------------------------------------------
        # 5. Career match
        # ------------------------------------------------------
        if user["career"] == mentor["career"]:
            score += WEIGHTS["career_match"]

        # ------------------------------------------------------
        # 6. Semester advantage
        # ------------------------------------------------------
        if mentor["semester"] > user["semester"]:
            score += WEIGHTS["semester_advantage"]

        # ------------------------------------------------------
        # 7. Bio semantic
        # ------------------------------------------------------
        sim = compute_embedding_similarity(user["bio"], mentor["bio"])
        score += sim * WEIGHTS["bio_semantic"]

        # ------------------------------------------------------
        # Save result
        # ------------------------------------------------------
        results.append({
            "mentor": mentor,
            "compatibilityScore": round(score * 10, 2),
            "matchReasons": reasons
        })

    results.sort(key=lambda x: x["compatibilityScore"], reverse=True)

    return {
        "candidates": results,
        "total": len(results)
    }

def format_match_result(raw, user):
    mentor = raw["mentor"]

    return {
        "id": mentor.get("id", None),  # si no tienes id aún puedes dejar None
        "user": {
            "id": mentor.get("id", None),
            "firstName": mentor["firstName"],
            "lastName": mentor["lastName"][0] + '.',
            "career": mentor["career"],
            "semester": mentor["semester"],
            "profileImage": mentor.get("profileImage", None),
            "bio": mentor["bio"]
        },
        "compatibilityScore": raw["compatibilityScore"],
        "matchType": "MENTOR",
        "matchReasons": raw["matchReasons"],
        "commonInterests": extract_common_interests(user, mentor),
        "mentorStats": {
            "successRate": mentor.get("successRate", 0),
            "avgRating": mentor.get("avgRating", 0),
            "totalSessions": mentor.get("totalSessions", 0)
        }
    }

def get_candidates(user_id: int, limit: int, offset: int, supabase):
    user = get_user_profile(user_id, supabase)
    mentors_data = get_mentors(user_id, supabase)
    mentors = mentors_data["mentors"]

    # Matching
    match_results = match_user_to_mentors(user, mentors)
    candidates = match_results["candidates"]

    total = len(candidates)

    # Pagination
    sliced = candidates[offset : offset + limit]

    # Final formatting
    formatted = [format_match_result(c, user) for c in sliced]

    return {
        "candidates": formatted,
        "pagination": {
            "total": total,
            "limit": limit,
            "offset": offset,
            "hasMore": offset + limit < total
        }
    }

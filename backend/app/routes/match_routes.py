from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import extract_text_from_pdf
from app.services.tfidf_service import vectorize_text
from app.services.similarity_service import calculate_similarity
from app.services.adzuna_service import fetch_jobs_from_adzuna
from app.utils.text_preprocessing import clean_text
from rapidfuzz import fuzz
import os
import re
router = APIRouter()


# ------------------------
# NORMALIZE SKILLS
# ------------------------
def normalize(skill):
    skill = skill.lower().strip()

    # remove special characters (., -, _, etc.)
    skill = re.sub(r"[^\w\s\+]", " ", skill)

    # normalize spaces
    skill = re.sub(r"\s+", " ", skill).strip()

    # remove spaces in common tech patterns (node js → nodejs)
    skill = skill.replace(" js", "js")   # react js → reactjs
    skill = skill.replace(" ts", "ts")   # node ts → nodets

    return skill

# ------------------------
# FUZZY MATCHING
# ------------------------
def fuzzy_match(resume_skills, job_skills, threshold=80):
    matched = []
    missing = []

    for job_skill in job_skills:
        found = False

        for res_skill in resume_skills:
            if fuzz.ratio(res_skill, job_skill) >= threshold:
                matched.append(job_skill)
                found = True
                break

        if not found:
            missing.append(job_skill)

    return matched, missing


# ------------------------
# SMART QUERY BUILDER
# ------------------------
def build_query(resume_skills):
    skills = set(resume_skills)

    # ------------------------
    # AI / ML / Data Roles
    # ------------------------
    if any(s in skills for s in ["machine learning", "deep learning", "nlp", "tensorflow", "pytorch"]):
        return "machine learning engineer"

    if any(s in skills for s in ["data science", "pandas", "numpy", "statistics"]):
        return "data scientist"

    if any(s in skills for s in ["sql", "excel", "power bi", "tableau"]):
        return "data analyst"

    # ------------------------
    # Backend Roles
    # ------------------------
    if any(s in skills for s in ["django", "flask", "node", "nodejs", "express"]):
        return "backend developer"

    # ------------------------
    # Frontend Roles
    # ------------------------
    if any(s in skills for s in ["react", "angular", "vue", "javascript", "html", "css"]):
        return "frontend developer"

    # ------------------------
    # Full Stack
    # ------------------------
    if any(s in skills for s in ["mern", "mean", "full stack"]):
        return "full stack developer"

    # ------------------------
    # Mobile Development
    # ------------------------
    if any(s in skills for s in ["android", "kotlin", "flutter", "react native"]):
        return "mobile app developer"

    # ------------------------
    # DevOps / Cloud
    # ------------------------
    if any(s in skills for s in ["docker", "kubernetes", "aws", "azure", "gcp"]):
        return "devops engineer"

    # ------------------------
    # Cybersecurity
    # ------------------------
    if any(s in skills for s in ["cybersecurity", "penetration testing", "network security"]):
        return "cyber security engineer"

    # ------------------------
    # Java Roles
    # ------------------------
    if "java" in skills:
        return "java developer"

    # ------------------------
    # Python General
    # ------------------------
    if "python" in skills:
        return "python developer"

    # ------------------------
    # Default
    # ------------------------
    return "software engineer"
@router.post("/match_file")
async def match_resume_file(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are supported"}

    temp_path = "temp_resume.pdf"

    try:
        # ------------------------
        # Save file
        # ------------------------
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        # ------------------------
        # Extract resume
        # ------------------------
        resume_data = extract_text_from_pdf(temp_path)

        resume_text = resume_data["resume_text"]
        resume_skills = resume_data["resume_skills"]

        if not resume_text.strip():
            return {"error": "No text extracted"}

        cleaned_resume = clean_text(resume_text)

        resume_skills_list = [normalize(s) for s in resume_skills if s]

        print("Resume Skills:", resume_skills_list)

        # ------------------------
        # BUILD SMART QUERY
        # ------------------------
        query = build_query(resume_skills_list)
        print("Search Query:", query)

        # ------------------------
        # FETCH JOBS
        # ------------------------
        jobs = fetch_jobs_from_adzuna(query)

        if not jobs:
            return {"error": "No jobs found"}

        print("Total jobs fetched:", len(jobs))

        # ------------------------
        # TF-IDF SIMILARITY
        # ------------------------
        job_descriptions = [job["job_description"] for job in jobs]

        tfidf_matrix = vectorize_text(cleaned_resume, job_descriptions)
        similarity_scores = calculate_similarity(tfidf_matrix)

        results = []

        # ------------------------
        # PROCESS EACH JOB
        # ------------------------
        for i, job in enumerate(jobs):

            job_skills = job.get("skills_required", [])
            job_skills_list = [normalize(s) for s in job_skills if s]

            if not job_skills_list:
                continue

            # FUZZY MATCH
            matched_skills, missing_skills = fuzzy_match(
                resume_skills_list,
                job_skills_list
            )

            print("\nJOB:", job["job_title"])
            print("Matched:", matched_skills)

            # FILTER
            if len(matched_skills) == 0:
                if similarity_scores[i] < 0.15:
                    continue

            # SCORING
            skill_score = len(matched_skills) / len(job_skills_list) if job_skills_list else 0
            similarity_score = similarity_scores[i]

            if len(matched_skills) == 0:
                final_score = similarity_score * 0.3
            else:
                final_score = (0.7 * skill_score) + (0.3 * similarity_score)
            final_score = max(final_score, 0.05)

            results.append({
                "job_id": job["job_id"],
                "job_title": job["job_title"],
                "company": job["company"],
                "score": round(final_score * 100, 2),
                "matched_skills": matched_skills,
                "missing_skills": missing_skills[:8],
                "location": job["location"],
                "redirect_url": job["redirect_url"]
            })

        results = sorted(results, key=lambda x: x["score"], reverse=True)

        return {"top_jobs": results[:5]}

    except Exception as e:
        return {"error": str(e)}

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
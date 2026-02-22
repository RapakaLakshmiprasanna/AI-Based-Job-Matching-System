# app/routes/match_routes.py
from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import extract_text_from_pdf
from app.services.tfidf_service import vectorize_text
from app.services.similarity_service import calculate_similarity
from app.services.adzuna_service import fetch_jobs_from_adzuna
from app.utils.text_preprocessing import clean_text
import os
import re

router = APIRouter()

# ------------------------
# PDF Upload & Matching
# ------------------------
@router.post("/match_file")
async def match_resume_file(file: UploadFile = File(...)):
    """
    Upload a PDF resume, extract text, match with jobs, and return top 5 matches.
    """
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are supported"}

    temp_path = f"temp_resume.pdf"
    try:
        # Save uploaded PDF temporarily
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        # Extract text from PDF
        resume_text = extract_text_from_pdf(temp_path)

        if not resume_text.strip():
            return {"error": "No text could be extracted from the PDF."}

        # Clean resume text
        cleaned_resume = clean_text(resume_text)

        # Fetch jobs
        jobs = fetch_jobs_from_adzuna()
        if not jobs:
            return {"error": "No jobs available at the moment"}

        # Vectorize & similarity
        job_descriptions = [job["job_description"] for job in jobs]
        tfidf_matrix = vectorize_text(resume_text, job_descriptions)
        similarity_scores = calculate_similarity(tfidf_matrix)

        # Add similarity as percentage
        for i, job in enumerate(jobs):
            job["similarity_score"] = round(similarity_scores[i] * 100, 2)

        # ----------------------
        # Skill matching
        # ----------------------
        def normalize(text):
            return re.sub(r"[^a-z0-9\s]", "", text.lower())

        clean_resume_text = normalize(resume_text)

        results = []
        for job in jobs:
            job_skills = [s.strip() for s in job.get("skills_required", "").split(",") if s.strip()]
            matched_skills = []
            missing_skills = []
        
            for skill in job_skills:
                # Check if normalized skill is a substring anywhere in resume
                if normalize(skill) in clean_resume_text:
                    matched_skills.append(skill)
                else:
                    missing_skills.append(skill)
        
            results.append({
                "job_id": job["job_id"],
                "job_title": job["job_title"],
                "company": job["company"],
                "similarity_score": job["similarity_score"],
                "matched_skills": matched_skills,
                "missing_skills": missing_skills,
                "redirect_url": job["redirect_url"],
                "location": job["location"]
            })
        # Return top 5 by similarity
        top_results = sorted(results, key=lambda x: x["similarity_score"], reverse=True)[:5]
        print(top_results)
        return {"top_jobs": top_results}

    except Exception as e:
        return {"error": f"Failed to process PDF: {str(e)}"}

    finally:
        # Remove temp file safely
        if os.path.exists(temp_path):
            os.remove(temp_path)
from fastapi import APIRouter
import pandas as pd
from app.services.tfidf_service import vectorize_text
from app.services.similarity_service import calculate_similarity
from app.utils.text_preprocessing import clean_text

router = APIRouter()

@router.post("/match")
def match_resume(data: dict):
    resume_text = data.get("resume_text")

    if not resume_text:
        return {"error": "Resume text is required"}

    cleaned_resume = clean_text(resume_text)

    # Load jobs dataset
    df = pd.read_csv("jobs_dataset/jobs.csv")

    job_descriptions = df["job_description"].tolist()

    # Vectorize
    tfidf_matrix = vectorize_text(resume_text, job_descriptions)

    # Calculate similarity
    similarity_scores = calculate_similarity(tfidf_matrix)

    df["similarity_score"] = similarity_scores

    # Sort by highest score
    top_jobs = df.sort_values(by="similarity_score", ascending=False).head(5)

    results = []

    for _, row in top_jobs.iterrows():
        job_skills = row["skills_required"].lower().split(",")

        matched_skills = []
        missing_skills = []

        for skill in job_skills:
            skill = skill.strip()
            if skill in cleaned_resume:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        results.append({
            "job_id": row["job_id"],
            "job_title": row["job_title"],
            "company": row["company"],
            "similarity_score": round(row["similarity_score"], 2),
            "matched_skills": matched_skills,
            "missing_skills": missing_skills
        })

    return {"top_jobs": results}

import requests
from app.services.skill_extractor_service import extract_skills

ADZUNA_APP_ID = "cc37478d"
ADZUNA_APP_KEY = "e2ae3c3f9d143551929899b1ae9eafb8"
ADZUNA_COUNTRY = "in"


def clean_skills(skills):
    blacklist = [
        "job description", "responsibilities", "requirements",
        "experience", "skills", "knowledge","innovation","innovative","modern","improving","performance"
    ]

    return [
        s.lower().strip()
        for s in skills
        if s and len(s) > 2 and s.lower() not in blacklist
    ]


def fetch_jobs_from_adzuna(query="software engineer"):
    all_jobs = []

    for page in range(1, 3):
        url = f"https://api.adzuna.com/v1/api/jobs/{ADZUNA_COUNTRY}/search/{page}"

        params = {
            "app_id": ADZUNA_APP_ID,
            "app_key": ADZUNA_APP_KEY,
            "results_per_page": 50,
            "what": query
        }

        response = requests.get(url, params=params)
        data = response.json()

        print("API Query:", query)
        print("Jobs found:", data.get("count"))

        # 🔥 FALLBACK
        if data.get("count", 0) == 0:
            print("Fallback → software engineer")
            params["what"] = "software engineer"
            response = requests.get(url, params=params)
            data = response.json()

        for job in data.get("results", []):
            description = job.get("description", "")

            skills = clean_skills(extract_skills(description))

            if len(skills) < 2:
                continue

            all_jobs.append({
                "job_id": job.get("id"),
                "job_title": job.get("title"),
                "company": job.get("company", {}).get("display_name", "Unknown"),
                "job_description": description,
                "redirect_url": job.get("redirect_url"),
                "location": job.get("location", {}).get("display_name", "India"),
                "skills_required": skills
            })

    return all_jobs
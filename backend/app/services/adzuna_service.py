import requests
from app.services.skill_extractor_service import extract_skills

ADZUNA_APP_ID = "cc37478d"
ADZUNA_APP_KEY = "e2ae3c3f9d143551929899b1ae9eafb8"
ADZUNA_COUNTRY = "in"


def fetch_jobs_from_adzuna():
    url = f"https://api.adzuna.com/v1/api/jobs/{ADZUNA_COUNTRY}/search/1"

    params = {
        "app_id": ADZUNA_APP_ID,
        "app_key": ADZUNA_APP_KEY,
        "results_per_page": 50,
        "content-type": "application/json",
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()

        data = response.json()
        jobs = []

        for job in data.get("results", []):

            description = job.get("description", "")

            skills = extract_skills(description)

            jobs.append({
                "job_id": job.get("id"),
                "job_title": job.get("title"),
                "company": job.get("company", {}).get("display_name", "Unknown"),
                "job_description": description,
                "redirect_url": job.get("redirect_url"),
                "location": job.get("location", {}).get("display_name", "India"),
                "skills_required": skills
            })

        return jobs

    except Exception as e:
        print("Error fetching jobs:", e)
        return []
# app/services/adzuna_service.py
import requests
import os

ADZUNA_APP_ID = "#"
ADZUNA_APP_KEY = "#"
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
            jobs.append({
                "job_id": job.get("id"),
                "job_title": job.get("title"),
                "company": job.get("company", {}).get("display_name", "Unknown"),
                "job_description": job.get("description", ""),
                "redirect_url": job.get("redirect_url"),
                "location": job.get("location", {}).get("display_name", "India"),
                "skills_required": ""  # Optional: you can extract skills from description if you want
            })

        return jobs
    except Exception as e:
        print("Error fetching jobs:", e)
        return []
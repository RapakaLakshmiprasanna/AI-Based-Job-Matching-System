from fastapi import APIRouter
import pandas as pd

router = APIRouter()

@router.get("/jobs")
def get_all_jobs():
    try:
        df = pd.read_csv("jobs_dataset/jobs.csv")
        jobs = df.to_dict(orient="records")
        return {"jobs": jobs}
    except Exception as e:
        return {"error": str(e)}

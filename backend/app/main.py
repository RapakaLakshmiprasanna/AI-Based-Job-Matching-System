from fastapi.middleware.cors import CORSMiddleware
from app.routes import match_routes
from fastapi import FastAPI
from app.routes import job_routes
from app.utils.text_preprocessing import clean_text

app = FastAPI()
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include job routes
app.include_router(job_routes.router)
app.include_router(match_routes.router)


@app.get("/")
def root():
    return {"message": "AI Job Matching System Backend Running"}

@app.get("/health")
def health_check():
    return {"status": "OK"}

@app.get("/test-clean")
def test_clean():
    sample = "React Developer!!! Skilled in REST APIs & SQL."
    cleaned = clean_text(sample)
    return {"original": sample, "cleaned": cleaned}

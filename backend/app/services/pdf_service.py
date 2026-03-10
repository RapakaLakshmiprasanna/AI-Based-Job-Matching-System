from PyPDF2 import PdfReader
from app.services.skill_extractor_service import extract_skills


def extract_text_from_pdf(file_path: str):
    try:
        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            text += page.extract_text() or ""

        # print("Extracted resume text:", text)

        skills = extract_skills(text)

        return {
            "resume_text": text,
            "resume_skills": skills
        }

    except Exception as e:
        print("Error extracting PDF:", e)
        return {
            "resume_text": "",
            "resume_skills": []
        }
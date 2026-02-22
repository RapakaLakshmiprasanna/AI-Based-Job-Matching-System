# app/services/pdf_service.py
import pdfplumber

def extract_text_from_pdf(file_path: str) -> str:
    try:
        from PyPDF2 import PdfReader
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        print("Extracted resume text:", text)  # << debug log
        return text
    except Exception as e:
        print("Error extracting PDF:", e)
        return ""
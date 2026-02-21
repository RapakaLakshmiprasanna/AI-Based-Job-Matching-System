from sklearn.feature_extraction.text import TfidfVectorizer
from app.utils.text_preprocessing import clean_text

def vectorize_text(resume_text, job_descriptions):
    """
    Convert resume and job descriptions into TF-IDF vectors
    """

    # Clean resume
    cleaned_resume = clean_text(resume_text)

    # Clean job descriptions
    cleaned_jobs = [clean_text(job) for job in job_descriptions]

    # Combine resume + jobs for vectorization
    all_documents = [cleaned_resume] + cleaned_jobs

    # Create TF-IDF vectorizer
    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(all_documents)

    return tfidf_matrix

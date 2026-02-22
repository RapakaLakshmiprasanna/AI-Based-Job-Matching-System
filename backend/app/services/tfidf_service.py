from sklearn.feature_extraction.text import TfidfVectorizer
from app.utils.text_preprocessing import clean_text

from sklearn.feature_extraction.text import TfidfVectorizer

def vectorize_text(resume_text, job_descriptions):
    corpus = [resume_text] + job_descriptions
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(corpus)
    return tfidf_matrix

# app/services/similarity_service.py
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(tfidf_matrix):
    resume_vector = tfidf_matrix[0]
    job_vectors = tfidf_matrix[1:]

    similarity_scores = cosine_similarity(resume_vector, job_vectors)[0]

    return similarity_scores


from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(tfidf_matrix):
    # First row is resume, rest are job descriptions
    resume_vector = tfidf_matrix[0]
    job_vectors = tfidf_matrix[1:]
    similarity_scores = cosine_similarity(resume_vector, job_vectors)[0]
    return similarity_scores  # array of floats between 0 and 1

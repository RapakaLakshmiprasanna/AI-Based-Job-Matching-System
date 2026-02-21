from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(tfidf_matrix):
    """
    Compute cosine similarity between resume and jobs
    """

    # Resume vector is first row
    resume_vector = tfidf_matrix[0:1]

    # Job vectors are remaining rows
    job_vectors = tfidf_matrix[1:]

    similarities = cosine_similarity(resume_vector, job_vectors)

    return similarities[0]

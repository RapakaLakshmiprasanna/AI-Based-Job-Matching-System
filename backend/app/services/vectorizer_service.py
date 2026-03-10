from sklearn.feature_extraction.text import TfidfVectorizer

def vectorize_text(resume_text, job_descriptions):

    corpus = [resume_text] + job_descriptions

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(corpus)
    print("==================================")
    print(tfidf_matrix)
    return tfidf_matrix
from sklearn.feature_extraction.text import TfidfVectorizer

def vectorize_text(resume_text, job_descriptions):
    corpus = [resume_text] + job_descriptions

    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
    return vectorizer.fit_transform(corpus)


# AI-Based Resume–Job Matching System

An AI-powered web application that matches student resumes with job descriptions using Machine Learning (TF-IDF + Cosine Similarity) and provides skill gap analysis.

---

## 🚀 Project Overview

This system:

- Accepts resume text input
- Compares it with a dataset of job descriptions
- Ranks jobs based on similarity score
- Displays matched and missing skills
- Built using React (Frontend) + FastAPI (Backend)

---

## 🏗 Tech Stack

Frontend:
- React
- JavaScript
- Fetch API

Backend:
- FastAPI
- Python
- Pandas
- Scikit-learn (TF-IDF + Cosine Similarity)

---

# 📂 Project Structure

```

ai-job-matching-system/
│
├── backend/
│   ├── app/
│   ├── jobs_dataset/
│   ├── requirements.txt
│
├── frontend/
│
└── README.md

```

---

# 🖥 Backend Setup & Run Instructions

## 1️⃣ Navigate to Backend Folder

```

cd backend

```

## 2️⃣ Create Virtual Environment

```

python -m venv venv

```

## 3️⃣ Activate Virtual Environment

Windows:
```

venv\Scripts\activate

```

Mac/Linux:
```

source venv/bin/activate

```

## 4️⃣ Install Required Dependencies

```

pip install -r requirements.txt

```

If requirements.txt is not generated:

```

pip install fastapi uvicorn pandas scikit-learn openai python-dotenv

```

## 5️⃣ Run Backend Server

```

uvicorn app.main:app --reload

```

Backend will start at:

```

[http://127.0.0.1:8000](http://127.0.0.1:8000)

```

Swagger API Docs:

```

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

```

---

# 🌐 Frontend Setup & Run Instructions

## 1️⃣ Navigate to Frontend Folder

```

cd frontend

```

## 2️⃣ Install Node Modules

```

npm install

```

## 3️⃣ Start React App

```

npm start

```

Frontend will start at:

```

[http://localhost:3000](http://localhost:3000)

```

---

# 🔄 How the System Works

1. User enters resume text in frontend.
2. Frontend sends POST request to backend `/match` endpoint.
3. Backend:
   - Loads job dataset
   - Preprocesses text
   - Applies TF-IDF vectorization
   - Calculates cosine similarity
   - Performs skill gap analysis
4. Backend returns ranked jobs.
5. Frontend displays results with match percentage.

---

# 📊 Dataset

The system uses a structured CSV dataset located at:

```

backend/jobs_dataset/jobs.csv

```

Dataset contains:
- job_id
- job_title
- company
- skills_required
- job_description

---

# 🛠 Development Notes

- Backend must be running before using frontend.
- Ensure CORS middleware is enabled in FastAPI.
- Keep only one `.git` folder at root level (avoid nested repositories).

---

# 🎓 Academic Purpose

This project demonstrates:

- Natural Language Processing
- Vector Space Model
- TF-IDF
- Cosine Similarity
- Skill Gap Analysis
- Full Stack Integration

---

# 👨‍💻 Author

Developed as a B.Tech Major Project. By Lakshmi Prasanna Rapaka
```



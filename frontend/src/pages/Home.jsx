import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-wrapper">
      <style>{`
        body {
          margin:0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);
        }

        .page-wrapper{
          max-width:1100px;
          margin:0 auto;
          padding:60px 20px;
          text-align:center;
          color:#1e293b;
        }

        .hero-title{
          font-size:3rem;
          font-weight:800;
          background:linear-gradient(135deg,#2563eb,#8b5cf6);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          margin-bottom:20px;
        }

        .hero-subtitle{
          font-size:1.2rem;
          color:#64748b;
          max-width:650px;
          margin:0 auto 40px auto;
          line-height:1.6;
        }

        .primary-btn{
          background:linear-gradient(135deg,#3b82f6,#6366f1);
          color:white;
          border:none;
          padding:16px 40px;
          border-radius:999px;
          font-size:1.1rem;
          font-weight:600;
          cursor:pointer;
          box-shadow:0 10px 20px rgba(59,130,246,0.3);
          transition:all .3s ease;
        }

        .primary-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 15px 25px rgba(59,130,246,0.4);
        }

        .features{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:30px;
          margin-top:70px;
        }

        .feature-card{
          background:white;
          padding:30px;
          border-radius:16px;
          box-shadow:0 10px 20px rgba(0,0,0,0.05);
        }

        .feature-title{
          font-size:1.2rem;
          font-weight:700;
          margin-bottom:10px;
        }

        .feature-text{
          color:#64748b;
          font-size:0.95rem;
        }

        /* HOW IT WORKS SECTION */

        .how-section{
          margin-top:80px;
        }

        .how-title{
          font-size:2rem;
          font-weight:700;
          margin-bottom:40px;
        }

        .how-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:25px;
        }

        .how-card{
          background:white;
          padding:25px;
          border-radius:16px;
          box-shadow:0 10px 20px rgba(0,0,0,0.05);
        }

        .how-card h3{
          margin-bottom:10px;
        }

        .how-card p{
          color:#64748b;
          font-size:0.95rem;
        }

      `}</style>

      <h1 className="hero-title">AI Resume Job Matching System</h1>

      <p className="hero-subtitle">
        Upload your resume and discover the best job opportunities using 
        AI-powered resume analysis and intelligent job matching.
      </p>

      <Link to="/matcher">
        <button className="primary-btn">
          Start Matching Jobs
        </button>
      </Link>

      {/* FEATURES */}

      <div className="features">

        <div className="feature-card">
          <div className="feature-title">Resume Analysis</div>
          <div className="feature-text">
            Extracts text from resumes and processes it using NLP techniques.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-title">AI Job Matching</div>
          <div className="feature-text">
            Uses TF-IDF vectorization and cosine similarity to match resumes with job descriptions.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-title">Skill Gap Detection</div>
          <div className="feature-text">
            Shows matched and missing skills to help improve your job readiness.
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-title">Real-Time Jobs</div>
          <div className="feature-text">
            Fetches real job listings through the Adzuna API and redirects to the original job portal.
          </div>
        </div>

      </div>

      {/* HOW IT WORKS */}

      <div className="how-section">

        <h2 className="how-title">How It Works</h2>

        <div className="how-grid">

          <div className="how-card">
            <h3>1️⃣ Upload Resume</h3>
            <p>
              Users upload their resume in PDF format through the web interface.
            </p>
          </div>

          <div className="how-card">
            <h3>2️⃣ Resume Processing</h3>
            <p>
              The system extracts and analyzes text from the resume to identify skills and experience.
            </p>
          </div>

          <div className="how-card">
            <h3>3️⃣ AI Matching</h3>
            <p>
              AI compares the resume with job descriptions and calculates similarity scores.
            </p>
          </div>

          <div className="how-card">
            <h3>4️⃣ Apply to Jobs</h3>
            <p>
              The system displays the best matching jobs and redirects users to apply.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;
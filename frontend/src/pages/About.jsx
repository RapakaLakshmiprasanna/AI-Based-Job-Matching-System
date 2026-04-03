import React from "react";

const About = () => {
  return (
    <div className="page-wrapper">

      <style>{`
        body{
          margin:0;
          font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%);
        }

        .page-wrapper{
          max-width:1100px;
          margin:0 auto;
          padding:60px 20px;
          color:#1e293b;
        }

        .title{
          text-align:center;
          font-size:2.5rem;
          font-weight:800;
          background:linear-gradient(135deg,#2563eb,#8b5cf6);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          margin-bottom:20px;
        }

        .subtitle{
          text-align:center;
          color:#64748b;
          max-width:700px;
          margin:0 auto 50px auto;
          font-size:1.1rem;
          line-height:1.6;
        }

        .cards{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          gap:30px;
        }

        .card{
          background:white;
          padding:30px;
          border-radius:16px;
          box-shadow:0 10px 20px rgba(0,0,0,0.05);
        }

        .card-title{
          font-size:1.2rem;
          font-weight:700;
          margin-bottom:10px;
        }

        .card-text{
          color:#64748b;
          font-size:0.95rem;
        }

      `}</style>

      <h1 className="title">About Our Platform</h1>

      <p className="subtitle">
        Our platform helps job seekers discover the most relevant job opportunities
        by analyzing their resumes and comparing them with real job postings.
        The goal is to simplify the job search process and help candidates
        understand how well their skills match different roles.
      </p>

      <div className="cards">

        <div className="card">
          <div className="card-title">Smart Resume Analysis</div>
          <div className="card-text">
            The system analyzes the content of a resume and identifies important
            skills, experience, and qualifications.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Job Matching</div>
          <div className="card-text">
            It compares resume information with available job descriptions and
            highlights the most relevant opportunities.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Skill Insights</div>
          <div className="card-text">
            Users can see which skills match a job role and which skills might
            be missing, helping them prepare better for the job market.
          </div>
        </div>

        <div className="card">
          <div className="card-title">Direct Job Access</div>
          <div className="card-text">
            The platform provides direct access to real job postings where
            candidates can explore details and apply.
          </div>
        </div>

      </div>

    </div>
  );
};

export default About;
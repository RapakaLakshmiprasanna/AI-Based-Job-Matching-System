// ResumeFormPage.jsx
import React, { useState } from "react";

const ResumeFormPage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a resume PDF");
      return;
    }

    setLoading(true);
    setResults([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/match_file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResults(data.top_jobs);
       
        
    
       
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch job matches");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Job Matching System</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "15px" }}
      />

      <button style={styles.button} onClick={handleSubmit}>
        Find Matching Jobs
      </button>

      {loading && <p style={styles.loading}>Finding best matches...</p>}

      <div style={styles.resultsContainer}>
        {results.map((job, index) => (
          <div key={index} style={styles.card}>
            <h3>{job.job_title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location.display_name || job.location}</p>
            <p><strong>Match Score:</strong> {(job.similarity_score).toFixed(0)}%</p>
            <p><strong>Matched Skills:</strong> {job.matched_skills.length > 0 ? job.matched_skills.join(", ") : "None"}</p>
            <p><strong>Missing Skills:</strong> {job.missing_skills.length > 0 ? job.missing_skills.join(", ") : "None"}</p>
            <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">View Job</a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: "800px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center", marginBottom: "20px" },
  button: { padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer", marginBottom: "20px" },
  loading: { color: "blue" },
  resultsContainer: { marginTop: "20px" },
  card: { border: "1px solid #ddd", borderRadius: "8px", padding: "15px", marginBottom: "15px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
};

export default ResumeFormPage;
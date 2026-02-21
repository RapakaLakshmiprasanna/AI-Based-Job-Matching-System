import React, { useState } from "react";

const ResumeFormPage = () => {
  const [resumeText, setResumeText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resumeText) {
      alert("Please enter resume text");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resume_text: resumeText })
      });

      const data = await response.json();
      setResults(data.top_jobs);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Job Matching System</h1>

      <textarea
        style={styles.textarea}
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
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
            <p>
              <strong>Match Score:</strong> {(job.similarity_score * 100).toFixed(0)}%
            </p>

            <p>
              <strong>Matched Skills:</strong>{" "}
              {job.matched_skills.length > 0
                ? job.matched_skills.join(", ")
                : "None"}
            </p>

            <p>
              <strong>Missing Skills:</strong>{" "}
              {job.missing_skills.length > 0
                ? job.missing_skills.join(", ")
                : "None"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    marginBottom: "15px",
    fontSize: "14px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px"
  },
  loading: {
    color: "blue"
  },
  resultsContainer: {
    marginTop: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }
};

export default ResumeFormPage;

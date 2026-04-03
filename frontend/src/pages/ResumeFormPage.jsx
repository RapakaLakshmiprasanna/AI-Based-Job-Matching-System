import React, { useState, useRef } from "react";

const ResumeFormPage = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progressWidths, setProgressWidths] = useState({});
  const fileInputRef = useRef(null);

  // --- Drag & Drop Handlers ---
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setResults([]);
      } else {
        alert('Please upload a valid PDF file.');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults([]);
    }
  };

  // --- API Fetch Logic ---
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a resume PDF");
      return;
    }

    setIsLoading(true);
    setResults([]);
    setProgressWidths({}); // Reset animations

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
        
        // Trigger animations for progress bars shortly after mounting
        setTimeout(() => {
          const widths = {};
          data.top_jobs.forEach((job, index) => {
            widths[index] = job.score ?? 0;
          });
          setProgressWidths(widths);
        }, 100);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch job matches. Please ensure the backend is running.");
    }

    setIsLoading(false);
  };

  // --- UI Helpers ---
  const getScoreColor = (score) => {
    if (score >= 70) return '#10b981'; // Green
    if (score >= 40) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <div className="page-wrapper">
      {/* Inline Styles for standalone usage */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 100vh; }
        
        .page-wrapper { max-width: 1100px; margin: 0 auto; padding: 60px 20px; color: #1e293b; }
        
        .hero { text-align: center; margin-bottom: 40px; }
        .hero-title { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #2563eb, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 16px 0; }
        .hero-subtitle { font-size: 1.125rem; color: #64748b; max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .upload-section { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02); text-align: center; margin-bottom: 40px; }
        .drop-zone { border: 2px dashed #cbd5e1; border-radius: 16px; padding: 50px 20px; cursor: pointer; transition: all 0.3s ease; background: #f8fafc; }
        .drop-zone.dragging { border-color: #3b82f6; background: #eff6ff; }
        .drop-zone:hover { border-color: #94a3b8; }
        .drop-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
        .file-name { font-weight: 600; color: #3b82f6; margin-top: 16px; font-size: 1.1rem; }
        
        .primary-btn { background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%); color: white; border: none; padding: 16px 40px; border-radius: 99px; font-size: 1.125rem; font-weight: 600; cursor: pointer; margin-top: 30px; box-shadow: 0 10px 15px -3px rgba(59,130,246,0.3); transition: all 0.3s ease; }
        .primary-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 20px -3px rgba(59,130,246,0.4); }
        .primary-btn:disabled { opacity: 0.6; cursor: not-allowed; box-shadow: none; transform: none; }
        
        .loading-state { text-align: center; margin: 40px 0; }
        .spinner { width: 50px; height: 50px; border: 4px solid #e2e8f0; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loading-text { color: #64748b; font-weight: 500; font-size: 1.1rem; }

        .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .job-card { background: white; border-radius: 16px; padding: 28px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; }
        .job-card:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
        
        .job-header { margin-bottom: 20px; }
        .job-title { font-size: 1.3rem; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; }
        .job-company { color: #475569; font-weight: 500; font-size: 1rem; margin: 0 0 4px 0; }
        .job-location { color: #94a3b8; font-size: 0.875rem; margin: 0; }
        
        .match-score-container { margin-bottom: 24px; }
        .match-score-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; }
        .progress-track { background: #e2e8f0; height: 8px; border-radius: 99px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1); width: 0%; }
        
        .skills-section { margin-bottom: 16px; flex-grow: 1; }
        .skills-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 700; margin: 0 0 10px 0; }
        .badge-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .badge { padding: 6px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 600; }
        .badge-green { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
        .badge-red { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
        .badge-gray { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }
        
        .view-btn { width: 100%; display: block; text-align: center; text-decoration: none; background: white; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px; font-weight: 600; color: #334155; cursor: pointer; transition: all 0.2s ease; margin-top: auto; }
        .view-btn:hover { background: #f8fafc; border-color: #94a3b8; color: #0f172a; }

        @media (max-width: 768px) {
          .page-wrapper { padding: 40px 16px; }
          .hero-title { font-size: 2rem; }
          .upload-section { padding: 24px; }
          .drop-zone { padding: 40px 16px; }
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">AI Job Matching System</h1>
        <p className="hero-subtitle">Upload your resume and discover the best matching job opportunities powered by AI.</p>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <div 
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".pdf" 
            style={{ display: 'none' }} 
          />
          <div className="drop-icon">📄</div>
          {file ? (
            <div>
              <p style={{ color: '#475569', margin: 0 }}>Selected File:</p>
              <p className="file-name">{file.name}</p>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 600, color: '#475569', margin: '0 0 8px 0' }}>Drag & drop your resume here</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Accepts PDF files only</p>
            </div>
          )}
        </div>

        <button 
          className="primary-btn" 
          onClick={handleSubmit} 
          disabled={!file || isLoading}
        >
          {isLoading ? 'Processing...' : 'Find Matching Jobs'}
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <div className="loading-text">Analyzing resume and finding best matches...</div>
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && !isLoading && (
        <div className="results-grid">
          {results.map((job, index) => {
            const scoreValue = Math.round(job.score ?? 0);
            const locationDisplay = job.location?.display_name || job.location || "Location not specified";
            const matchedSkills = job.matched_skills || [];
            const missingSkills = job.missing_skills || [];

            return (
              <div className="job-card" key={index}>
                <div className="job-header">
                  <h3 className="job-title">{job.job_title}</h3>
                  <p className="job-company">{job.company}</p>
                  <p className="job-location">📍 {locationDisplay}</p>
                </div>

                <div className="match-score-container">
                  <div className="match-score-header">
                    <span style={{ color: '#64748b' }}>Match Score</span>
                    <span style={{ color: getScoreColor(scoreValue) }}>{scoreValue}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${progressWidths[index] || 0}%`, 
                        backgroundColor: getScoreColor(scoreValue) 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="skills-section">
                  <h4 className="skills-title">Matched Skills</h4>
                  <div className="badge-container">
                    {matchedSkills.length > 0 ? (
                      matchedSkills.map((skill, i) => (
                        <span key={i} className="badge badge-green">{skill} ✓</span>
                      ))
                    ) : (
                      <span className="badge badge-gray">None</span>
                    )}
                  </div>

                  <h4 className="skills-title">Missing Skills</h4>
                  <div className="badge-container">
                    {missingSkills.length > 0 ? (
                      missingSkills.map((skill, i) => (
                        <span key={i} className="badge badge-red">{skill} ✕</span>
                      ))
                    ) : (
                      <span className="badge badge-gray">None</span>
                    )}
                  </div>
                </div>

                <a 
                  href={job.redirect_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="view-btn"
                >
                  View Job Details
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResumeFormPage;
import React from "react";

function Footer() {
  return (
    <div style={styles.footer}>
      <p>
        © 2026 AI Resume Job Matching System 
      </p>
    </div>
  );
}

const styles = {
  footer: {
    marginTop: "80px",
    padding: "20px",
    textAlign: "center",
    background: "#f1f5f9",
    color: "#64748b",
    fontSize: "14px"
  }
};

export default Footer;
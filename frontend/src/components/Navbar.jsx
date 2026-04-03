import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>AI Job Match</div>

      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/matcher">Resume Matcher</Link>
        <Link style={styles.link} to="/about">About</Link>
        <Link style={styles.link} to="/login">Login</Link>
        <Link style={styles.link} to="/signup">Signup</Link>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  logo: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#2563eb"
  },

  links: {
    display: "flex",
    gap: "25px"
  },

  link: {
    textDecoration: "none",
    color: "#334155",
    fontWeight: "500"
  }
};

export default Navbar;
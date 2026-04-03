import React from "react";

const Signup = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Account</h1>

      <div style={styles.card}>
        <input style={styles.input} placeholder="Full Name" />
        <input style={styles.input} placeholder="Email" />
        <input style={styles.input} placeholder="Password" type="password" />

        <button style={styles.button}>Sign Up</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginBottom: "20px"
  },
  card: {
    width: "300px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "12px",
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Signup;
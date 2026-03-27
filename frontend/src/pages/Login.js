import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Login.css";
import { buildApiUrl } from "../services/api";

// Icons for rotator
const icons = [
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><rect x="2" y="10" width="75" height="40" rx="4" fill="#0077cc"/><rect x="77" y="25" width="28" height="25" rx="4" fill="#005fa3"/><circle cx="20" cy="65" r="8" fill="#333"/><circle cx="45" cy="65" r="8" fill="#333"/><circle cx="70" cy="65" r="8" fill="#333"/><circle cx="95" cy="65" r="8" fill="#333"/><rect x="82" y="30" width="12" height="10" fill="#fff" opacity="0.7"/></svg>`,
    punchline: "Fast & Reliable Road Freight",
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 90"><polygon points="10,35 50,5 90,35" fill="#0077cc"/><rect x="15" y="35" width="70" height="45" fill="#005fa3" rx="3"/><rect x="40" y="50" width="20" height="30" fill="#fff"/><rect x="20" y="45" width="12" height="8" fill="#fff" opacity="0.7"/><rect x="68" y="45" width="12" height="8" fill="#fff" opacity="0.7"/></svg>`,
    punchline: "Secure Storage & Distribution Hubs",
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70"><rect x="10" y="35" width="100" height="20" fill="#0077cc"/><polygon points="10,35 5,55 115,55 110,35" fill="#005fa3"/><rect x="30" y="25" width="20" height="10" fill="#0077cc"/><rect x="55" y="20" width="20" height="15" fill="#0077cc"/><rect x="80" y="15" width="20" height="20" fill="#0077cc"/></svg>`,
    punchline: "Efficient Sea Freight Across Continents",
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect x="20" y="20" width="40" height="40" rx="5" fill="#0077cc"/><path d="M20 35 H60 M20 45 H60" stroke="#fff" stroke-width="3"/></svg>`,
    punchline: "Safe Handling of Every Package",
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="#0077cc"/><line x1="0" y1="40" x2="80" y2="40" stroke="#fff" stroke-width="2"/><line x1="40" y1="0" x2="40" y2="80" stroke="#fff" stroke-width="2"/><circle cx="40" cy="40" r="30" fill="none" stroke="#fff" stroke-width="2"/></svg>`,
    punchline: "Connecting your business globally",
  },
];

function Login({ onLogin = () => {} }) {
  const [iconIndex, setIconIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Rotate icons every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch(buildApiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      onLogin(data.userId || data.user);
      navigate("/PowerBIDashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-background"></div>
      <div className="login-overlay"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-left">
            <h1>WELCOME TO TOM & JERRY Logistics</h1>
            <h3>Track shipments, monitor KPIs, and manage everything from your portal.</h3>
            <div
              id="icon-rotator"
              dangerouslySetInnerHTML={{ __html: icons[iconIndex].svg }}
              className="rotating-icon"
            />
            <p>{icons[iconIndex].punchline}</p>
          </div>

          <div className="login-right">
            <h2>Already Part of the Family?</h2>
            <h3>Please login to view your dashboards</h3>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <button className="login-btn" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;


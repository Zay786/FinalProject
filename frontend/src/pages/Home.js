import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO SECTION WRAPPER */}
      <div className="hero-wrapper">

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
          src="https://www.pexels.com/download/video/30522944/"
        />

        {/* Left Full-Height Box */}
        <div className="hero-left-full">
          <h1>TOM & JERRY Logistics</h1>
          <p>
            Your trusted partner in international shipping and logistics solutions across continents.
          </p>

          <div className="buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              <h4>Already part of the Family?</h4>
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/quotation")}
            >
              <h4>Request a Free Quotation</h4>
            </button>
          </div>
        </div>

        {/* Triangle Overlay */}
        <div className="triangle-overlay"></div>

      </div>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-box">
          <i className="fa-solid fa-globe"></i>
          <h3>Global Reach</h3>
          <p>Serving 120+ countries worldwide.</p>
        </div>

        <div className="stat-box">
          <i className="fa-solid fa-truck-fast"></i>
          <h3>98% On-Time Delivery</h3>
          <p>Reliable and fast shipping guaranteed.</p>
        </div>

        <div className="stat-box">
          <i className="fa-solid fa-shield-halved"></i>
          <h3>Top-Tier Security</h3>
          <p>Secure handling of your cargo at every step.</p>
        </div>

        <div className="stat-box">
          <i className="fa-solid fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>Always available for your logistics needs.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;

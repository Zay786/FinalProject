import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

function About() {
  return (
    <div>
      <Navbar />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        id="video-background"
        src="https://media.gettyimages.com/id/1352015493/video/4k-video-footage-of-trucks-parked-in-a-row-in-a-warehouse.mp4?s=mp4-640x640-gi&k=20&c=mQvdQt-8iY8VBxP3FkSjX8F8_vzA_QrJYPirwmP6JWI="
      />

      <main>

        {/* ===== 1. FULL WIDTH — BUSINESS STORY ===== */}
        <section className="full-width-card">
{/* 1. Our Business Story */}
          <h2>Our Business Story</h2>
          <p>
            <strong className="highlight-blue">TOM & JERRY Logistics</strong> has been connecting businesses worldwide with reliable shipping services for more than <strong className="highlight-red">20 years</strong>. We pride ourselves on <strong>timely deliveries</strong>, <strong>global coverage</strong>, and <strong>customer satisfaction</strong>—even if the journey sometimes involves a little cartoon chaos.
          </p>
          <p>
            Our mission is to simplify the complexities of international logistics, allowing you to focus on matters that matter most to your business. We handle the traps, the mice, and the giant springs so your goods arrive safely.
          </p>
        </section>



        {/* ===== 2. TWO COLUMNS — FOUNDERS + WHAT WE DO ===== */}
        <div className="two-column">
          
          {/* LEFT: Founders */}
          <section className="column-card">
       <h2>Meet Our Founders</h2>
          <div className="founders-container">
            <div className="founder-card">
              <h3 className="founder-tom">Tomas Bradford (Tom)</h3>
              <p className="title"><strong>Co-Founder & Chief Strategy Officer (CSO)</strong></p>
              <p>A logistics veteran with over 25 years of experience in sea freight and supply chain optimization. Tomas champions innovation and operational excellence, ensuring every shipment has a detailed led plan.</p>
            </div>
            <div className="founder-card">
              <h3 className="founder-jerry">Jerry Lewis (Jerry)</h3>
              <p className="title"><strong>Co-Founder & Chief Operations Officer (COO)</strong></p>
              <p>Specializing in agile land transport networks and client relations. Jerry is dedicated to flawless, quick-witted execution, finding the shortest (and safest) path to the final destination.</p>
            </div>
          </div>

          </section>

          {/* RIGHT: What we do best */}
          <section className="column-card">
        <h2>What We do Best</h2>
          <p className="center-text">
            Our network ensures rapid, reliable delivery across key international hubs, while handling all the procedures and paperwork—so you don't have to. Our highly trained team navigates the trickiest routes with ease, handles customs, and manages last-mile deliveries to ensure your cargo arrives on time, every time.
          </p>
          <div className="image-container">
            <img src="/SupplyChain.png" alt="Logistics flow graphic" />
          </div>
          <p className="center-subtext">
          We provide end-to-end solutions, eliminating the risk of accidental cannonball shipments. From mine to port to doorstep, we've got you covered at each step of the journey. Whether it is operational logistics, freight forwarding, customs and clearance or supply chain management, we deliver peace of mind along with your cargo.
          </p>
          </section>
        </div>

        {/* ===== 3. FULL WIDTH — REGIONS ===== */}
        <section className="full-width-card">
          <h2>Global Reach</h2>

          <p className="center-text">Our clients operate across:</p>

          <div className="region-tags">
            <span className="region-tag">USA</span>
            <span className="region-tag">Europe</span>
            <span className="region-tag">Africa</span>
            <span className="region-tag">China</span>
            <span className="region-tag">Korea</span>
            <span className="region-tag">Germany</span>
            <span className="region-tag">Mauritius</span>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default About;

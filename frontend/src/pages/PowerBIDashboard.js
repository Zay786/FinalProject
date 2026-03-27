import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./PowerBIDashboard.css";

function PowerBIDashboard() {
  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        <h1>Power BI Logistics Performance Dashboard</h1>
        <p>
          Welcome to your centralized data visualization hub. Analyze key
          metrics, monitor fleet efficiency, and track shipment statuses
          in real time.
        </p>

        <div className="powerbi-container">
          <iframe
            title="Logistics Dashboard"
            src="https://app.powerbi.com/reportEmbed?reportId=4a7fadcf-50e8-4e31-a69c-3d35054d5c3d&autoAuth=true&ctid=7c571c99-cfb5-4c12-a4e1-94c47b960cca"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PowerBIDashboard;
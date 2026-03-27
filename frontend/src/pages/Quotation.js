import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Quotation.css";
import { buildApiUrl } from "../services/api";

const openPdfFromBase64 = (base64, fileName = "quotation.pdf") => {
  const binary = window.atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/pdf" });
  const fileUrl = window.URL.createObjectURL(blob);
  const newTab = window.open(fileUrl, "_blank", "noopener,noreferrer");

  if (!newTab) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }

  window.setTimeout(() => window.URL.revokeObjectURL(fileUrl), 60000);
};

const Quotation = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = {
      name: e.target.name.value,
      company: e.target.company.value,
      email: e.target.email.value,
      origin: e.target.origin.value,
      destination: e.target.destination.value,
      commodity: e.target.commodity.value,
      weight: parseFloat(e.target.weight.value),
      service: e.target.service.value,
    };

    try {
      const res = await fetch(buildApiUrl("/api/quotation"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage(`✅ Estimated Price: $${data.price}`);

      setMessage(`Estimated Price: $${data.price}`);
      if (data.pdf_base64) {
        openPdfFromBase64(data.pdf_base64, data.pdf_file_name);
      } else if (data.pdf_url) {
        window.open(data.pdf_url, "_blank");
      }

    } catch (err) {
      console.error(err);
      setMessage("❌ Error generating quotation");
      setMessage("Error generating quotation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quotation-page">
      <Navbar />

      <div className="quotation-container">
        <h1>Request a Quotation</h1>

        <form onSubmit={handleSubmit}>

          <input name="name" type="text" placeholder="Full Name" required />
          <input name="company" type="text" placeholder="Company Name" />
          <input name="email" type="email" placeholder="Email" required />

          <select name="origin" required>
            <option value="">-- Select Origin --</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Walvisbay">Walvisbay</option>
            <option value="Shanghai">Shanghai</option>
            <option value="Busan">Busan</option>
            <option value="Port Louis">Port Louis</option>
            <option value="Mumbai">Mumbai</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
          </select>

          <select name="destination" required>
            <option value="">-- Select Destination --</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Walvisbay">Walvisbay</option>
            <option value="Shanghai">Shanghai</option>
            <option value="Busan">Busan</option>
            <option value="Port Louis">Port Louis</option>
            <option value="Mumbai">Mumbai</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
          </select>

          <select name="commodity" required>
            <option value="">-- Select Commodity --</option>
            <option value="Sulphur">Sulphur</option>
            <option value="Copper">Copper</option>
            <option value="Maize">Maize</option>
            <option value="Wheat">Wheat</option>
          </select>

          <input name="weight" type="number" placeholder="Weight (T)" required />

          <select name="service" required>
            <option value="">-- Select Service Type --</option>
            <option value="Air Freight">Air Freight</option>
            <option value="Sea Freight">Sea Freight</option>
            <option value="Land Transport">Land Transport</option>
          </select>

          <textarea placeholder="Additional Notes"></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Submit Quotation"}
          </button>

        </form>

        {message && <p className="success-message">{message}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default Quotation;

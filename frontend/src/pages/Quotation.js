import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Quotation.css";

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
      const res = await fetch("http://localhost:5000/api/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage(`✅ Estimated Price: $${data.price}`);

      // Open PDF in new tab
      if (data.pdf_url) {
        window.open(data.pdf_url, "_blank");
      }

    } catch (err) {
      console.error(err);
      setMessage("❌ Error generating quotation");
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
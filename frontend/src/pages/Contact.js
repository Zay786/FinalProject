import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hr6thqk",     // ✅ Your EmailJS service ID
        "template_x4fquu9",    // ✅ Your EmailJS template ID
        form.current,
        "geSH37vPafj9j86dO"   // ✅ Your EmailJS public key
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error);
          alert("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <>
      <Navbar />

      <div className="contact-page">
        {/* LEFT — CONTACT FORM */}
        <div className="contact-container">
          <h1>Contact Us</h1>

          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="from_name"
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              name="from_email"
              placeholder="Email Address"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* RIGHT — INFO CARDS */}
        <div className="contact-info-grid">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Our Main Office</h3>
            <p>
              50HQ 94 Broadway St
              <br />
              New York, NY 1001
            </p>
          </div>

          <div className="info-card">
            <FaPhoneAlt className="info-icon" />
            <h3>Phone Number</h3>
            <p>
              234-9876-5400
              <br />
              888-0123-4567
            </p>
          </div>

          <div className="info-card">
            <FaFax className="info-icon" />
            <h3>Fax</h3>
            <p>1-234-567-8900</p>
          </div>

          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email</h3>
            <p>customerservice@tomjerry.com</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;

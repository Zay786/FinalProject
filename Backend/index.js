const express = require('express');
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();



const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

knex.select('user_id', 'username', 'password_hash', 'email')
    .from('logistics_users')
    .then((data) =>
    console.log("Database connected:", data.length, "users found")
  )
  .catch((err) => console.error("Database error:", err.message));

// ==========================
// LOGIN ENDPOINT
// ==========================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await knex("logistics_users").where("username", username).first();
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", userId: user.user_id })  ;
    } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ==========================
// QUOTATION ENDPOINT
// ==========================
app.post("/api/quotation", async (req, res) => {
  try {
    const data = req.body;

    console.log("Incoming request:", data);

    // Call Python ML service
    const response = await axios.post("http://127.0.0.1:8001/generate", data);

    const { price, pdf_url } = response.data;

    // Save to PostgreSQL
    await knex("quotations").insert({
      customer_name: data.name,
      company_name: data.company,
      email: data.email,
      origin: data.origin,
      destination: data.destination,
      commodity: data.commodity,
      weight_tons: data.weight,
      service_type: data.service,
      predicted_price: price
    });

    res.json({
      success: true,
      price,
      pdf_url
    });

  } catch (error) {
    console.error("FULL ERROR:", error.message);

    if (error.response) {
      console.error("Python API error:", error.response.data);
    }

    res.status(500).json({
      error: "Quotation generation failed"
    });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

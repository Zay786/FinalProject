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
    ssl: { rejectUnauthorized: false }  // ⚡ add this for Neon
  },
  searchPath: ['public'],
});

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Test DB connection
knex.raw("SELECT 1")
  .then(() => console.log("DB connected ✅"))
  .catch(err => console.error("DB error ❌", err.message));

// ==========================
// LOGIN
// ==========================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await knex("logistics_users")
      .where("username", username)
      .first();

    if (!user) return res.status(401).json({ error: "Invalid username" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    res.json({ message: "Login successful", userId: user.user_id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ==========================
// QUOTATION
// ==========================
app.post("/api/quotation", async (req, res) => {
  try {
    const data = req.body;

    const response = await axios.post(
      process.env.ML_API_URL + "/generate",
      data
    );

    const { price, pdf_url } = response.data;

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

    res.json({ success: true, price, pdf_url });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Quotation failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
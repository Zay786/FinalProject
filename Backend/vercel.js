const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const axios = require("axios");
const knexLib = require("knex");
require("dotenv").config();

const createDbConnection = () => {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
  };
};

const knex = knexLib({
  client: "pg",
  connection: createDbConnection(),
  searchPath: ["public"],
});

const getMlApiBaseUrl = (req) => {
  if (process.env.ML_API_URL) {
    return process.env.ML_API_URL;
  }

  const protocol = req.headers["x-forwarded-proto"] || "https";
  return `${protocol}://${req.headers.host}/api/ml`;
};

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await knex("logistics_users")
      .where("username", username)
      .first();

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.json({ message: "Login successful", userId: user.user_id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/quotation", async (req, res) => {
  try {
    const data = req.body;
    const response = await axios.post(`${getMlApiBaseUrl(req)}/generate`, data);
    const { price, pdf_base64, pdf_file_name } = response.data;

    await knex("quotations").insert({
      customer_name: data.name,
      company_name: data.company,
      email: data.email,
      origin: data.origin,
      destination: data.destination,
      commodity: data.commodity,
      weight_tons: data.weight,
      service_type: data.service,
      predicted_price: price,
    });

    return res.json({
      success: true,
      price,
      pdf_base64,
      pdf_file_name,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Quotation failed" });
  }
});

module.exports = app;

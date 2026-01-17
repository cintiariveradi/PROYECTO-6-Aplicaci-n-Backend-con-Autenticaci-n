const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");



const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API running" });
});

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

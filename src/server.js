const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);



app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API running" });
});

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

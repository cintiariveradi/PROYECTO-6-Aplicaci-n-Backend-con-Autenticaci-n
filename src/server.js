const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

// Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API running" });
});

const PORT = process.env.PORT || 3000;

// DB + Server
connectDB();
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

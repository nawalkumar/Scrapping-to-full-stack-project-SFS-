// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const path = require("path");
const categorizationRoutes = require("./routes/categorization");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// serve images statically
app.use(
    "/images",
    express.static(path.join(__dirname, "../scrap_to_render/downloaded_images"))
);

// routes
app.use("/api/categorization", categorizationRoutes);
app.use("/api/auth", authRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);

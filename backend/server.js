const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const footprintRoutes = require("./routes/footprintRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/footprints", footprintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

require("dotenv").config(); // ✅ Load .env before anything else

const express = require("express");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const authroute = require("./routes/auth");
const imageroute = require("./routes/image");
const userroute = require("./routes/users");
const postroute = require("./routes/posts");
const commentroute = require("./routes/comments");
const cors = require("cors");

const app = express();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ Correct key
    console.log("Database connected successfully");
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
  }
};

// CORS config
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins
  },
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/upload", imageroute);
app.use("/api/auth", authroute);
app.use("/api/users", userroute);
app.use("/api/posts", postroute);
app.use("/api/comments", commentroute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`App running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});


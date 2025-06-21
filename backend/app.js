const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");


// app.use(cors());
const allowedOrigins = [
  'http://localhost:3000',
  'https://mern-taskmanager-8d6l3cw22-adeeb-khans-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // new added code
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 👈 Include OPTIONS explicitly
  allowedHeaders: ["Content-Type", "Authorization"] 
  // credentials: true // Optional: only if using cookies or auth headers
}));

app.use(express.json());


const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});

//new added code
app.options("*", cors()); // 👈 Handles all OPTIONS preflight requests


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
// }

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

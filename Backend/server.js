// ✅ Import required packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🎓 Backend is running!");
});

// ✅ External Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// ✅ POST — Add new listing
app.post("/api/listings", async (req, res) => {
  try {
    const { title, description, category, price, user } = req.body;
    const newListing = new Listing({
      title,
      description,
      category,
      price,
      user,
    });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error("❌ Error creating listing:", error);
    res.status(500).json({ message: "Error creating listing" });
  }
});

// ✅ GET — Fetch all listings
app.get("/api/listings", async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    console.error("❌ Error fetching listings:", error);
    res.status(500).json({ message: "Error fetching listings" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

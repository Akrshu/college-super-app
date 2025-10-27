// ✅ Import required packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Listing = require("./models/Listing"); // import your Listing model

// ✅ Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/collegeApp")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  role: String,
});
const User = mongoose.model("User", userSchema);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🎓 Backend is running!");
});

// ✅ Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name || !role) {
      return res.status(400).json({ error: "Missing name or role" });
    }

    const newUser = new User({ name, role });
    await newUser.save();
    res.status(201).json({ message: "User added successfully!", user: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// 🧩 LISTINGS ROUTES 🧩

// ✅ POST route — Add new listing
app.post("/api/listings", async (req, res) => {
  try {
    const { title, description, category, price, user } = req.body;

    const newListing = new Listing({ title, description, category, price, user });
    await newListing.save();

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Error creating listing", error });
  }
});

// ✅ GET route — Fetch all listings
app.get("/api/listings", async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Error fetching listings", error });
  }
});


// ✅ Start server
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));

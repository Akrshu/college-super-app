import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ➕ Add a new user
router.post("/", async (req, res) => {
  try {
    const { name, role } = req.body;
    if (!name || !role) {
      return res.status(400).json({ error: "Missing name or role" });
    }

    const newUser = new User({ name, role });
    await newUser.save();
    res.status(201).json({ message: "User added successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

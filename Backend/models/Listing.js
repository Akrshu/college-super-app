// ✅ models/Listing.js
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ["Rent", "Food", "Tuition", "Hackathon"],
    required: true,
  },
  price: { type: Number },
  user: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;

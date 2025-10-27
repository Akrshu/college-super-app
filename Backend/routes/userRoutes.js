import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ name: "Arshi" }, { name: "Aditi" }]);
});

export default router;

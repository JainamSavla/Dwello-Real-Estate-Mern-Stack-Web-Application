import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
  deleteResidency,
} from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

// Debug middleware
const debugToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader ? "Present" : "Missing");
  if (authHeader) {
    const parts = authHeader.split(" ");
    console.log("Header parts:", parts.length);
    console.log("Token format:", parts[0] === "Bearer" ? "Valid" : "Invalid");
  }
  next();
};

router.post("/create", debugToken, jwtCheck, createResidency);
router.get("/allresd", getAllResidencies);
router.get("/:id", getResidency);
router.delete("/delete/:id", debugToken, jwtCheck, deleteResidency);
export { router as residencyRoute };

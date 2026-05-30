import express from "express";
import jwtCheck from "../config/auth0Config.js";
import {
  createCheckoutSession,
  confirmListingPayment,
} from "../controllers/paymentCntrl.js";

const router = express.Router();

router.post("/create-checkout-session", jwtCheck, createCheckoutSession);
router.post("/confirm-listing", jwtCheck, confirmListingPayment);

export { router as paymentRoute };

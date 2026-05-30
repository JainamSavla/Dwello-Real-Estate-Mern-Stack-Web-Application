import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import { prisma } from "../config/prismaConfig.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

const getClientUrl = () =>
  process.env.CLIENT_URL || "http://localhost:5173";

const getListingFee = () => Number(process.env.STRIPE_LISTING_FEE || 100);
const getCurrency = () => (process.env.STRIPE_CURRENCY || "inr").toLowerCase();

export const createCheckoutSession = asyncHandler(async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500);
    throw new Error("Stripe secret key not configured");
  }

  const clientUrl = getClientUrl();
  const amount = Math.round(getListingFee() * 100);
  const currency = getCurrency();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency,
          unit_amount: amount,
          product_data: {
            name: "Property listing fee",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/payment/cancel`,
  });

  res.send({ url: session.url, sessionId: session.id });
});

export const confirmListingPayment = asyncHandler(async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500);
    throw new Error("Stripe secret key not configured");
  }

  const { sessionId, propertyDetails } = req.body;

  if (!sessionId || !propertyDetails) {
    res.status(400);
    throw new Error("Missing sessionId or propertyDetails");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    res.status(402);
    throw new Error("Payment not completed");
  }

  const {
    title,
    description,
    price,
    rentPrice,
    listingType,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = propertyDetails;

  if (!userEmail) {
    res.status(400);
    throw new Error("Missing user email");
  }

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        rentPrice,
        listingType: listingType || "sale",
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

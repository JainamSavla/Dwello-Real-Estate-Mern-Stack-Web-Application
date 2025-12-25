import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
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

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to delete a residency
export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userEmail = req.body.email;

  try {
    // First check if the residency exists and belongs to the user
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    if (!residency) {
      res.status(404);
      throw new Error("Residency not found");
    }

    if (residency.userEmail !== userEmail) {
      res.status(403);
      throw new Error("You are not authorized to delete this property");
    }

    // Delete the residency
    await prisma.residency.delete({
      where: { id },
    });

    res.send({ message: "Residency deleted successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});
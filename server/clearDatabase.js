import { prisma } from "./config/prismaConfig.js";

async function clearDatabase() {
  try {
    console.log("🗑️  Clearing all residencies from database...");

    // First, let's check how many residencies exist
    const count = await prisma.residency.count();
    console.log(`📊 Found ${count} residencies in database`);

    if (count > 0) {
      // Delete all residencies
      const deletedResidencies = await prisma.residency.deleteMany({});
      console.log(`✅ Deleted ${deletedResidencies.count} residencies`);
    } else {
      console.log("ℹ️  No residencies found in database");
    }

    // Clear user bookings and favorites
    const updatedUsers = await prisma.user.updateMany({
      data: {
        bookedVisits: [],
        favResidenciesID: [],
      },
    });
    console.log(
      `✅ Cleared bookings and favorites for ${updatedUsers.count} users`
    );

    console.log("✨ Database cleared successfully!");
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

clearDatabase();

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function forceClean() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log("\n📋 Collections found:");
    collections.forEach((col) => console.log(`  - ${col.name}`));

    // Find and delete from Residency collection
    const residencyCollection = db.collection("Residency");
    const count = await residencyCollection.countDocuments();
    console.log(`\n📊 Found ${count} documents in Residency collection`);

    if (count > 0) {
      const result = await residencyCollection.deleteMany({});
      console.log(`🗑️  Deleted ${result.deletedCount} residencies`);
    }

    // Also try lowercase version
    try {
      const residencyCollectionLower = db.collection("residency");
      const countLower = await residencyCollectionLower.countDocuments();
      if (countLower > 0) {
        console.log(`📊 Found ${countLower} documents in residency collection`);
        const resultLower = await residencyCollectionLower.deleteMany({});
        console.log(
          `🗑️  Deleted ${resultLower.deletedCount} residencies from lowercase collection`
        );
      }
    } catch (e) {
      // Collection might not exist
    }

    console.log("\n✨ Database cleanup complete!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

forceClean();

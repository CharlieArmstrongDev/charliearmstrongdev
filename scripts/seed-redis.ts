#!/usr/bin/env tsx

// Redis seeding script - Run with: pnpm seed <command>

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), "apps/web/.env.local") });

import { seedRedisData, clearSeedData } from "../apps/web/lib/db/seed";
import { redis } from "../apps/web/lib/db/redis";

const command = process.argv[2];

async function main() {
  try {
    switch (command) {
      case "seed":
        console.log("🌱 Starting Redis seeding process...\n");
        await seedRedisData();
        break;

      case "clear":
        console.log("🧹 Starting Redis clearing process...\n");
        await clearSeedData();
        break;

      case "reset":
        console.log("🔄 Resetting Redis data...\n");
        await clearSeedData();
        console.log("\n");
        await seedRedisData();
        break;

      case "health":
        console.log("🏥 Checking Redis health...\n");
        try {
          const ping = await redis.ping();
          console.log("✅ Redis connection successful!");
          console.log("📊 Redis ping response:", ping);

          // Test basic operations
          await redis.set("health:test", "ok");
          const testValue = await redis.get("health:test");
          await redis.del("health:test");

          console.log("✅ Redis read/write operations successful!");
          console.log("🎯 Redis is ready for use");
        } catch (error) {
          console.error("❌ Redis health check failed:", error);
          process.exit(1);
        }
        break;

      default:
        console.log(`
Redis Data Management Script

Usage: pnpm seed <command>

Commands:
  seed   - Populate Redis with sample data
  clear  - Remove all seeded data from Redis
  reset  - Clear existing data and reseed
  health - Check Redis connection and basic operations

Examples:
  pnpm seed health
  pnpm seed seed
  pnpm seed reset
        `);
        break;
    }
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  } finally {
    // Close Redis connection
    try {
      // Note: @vercel/kv doesn't require explicit connection closing
      console.log("\n✨ Script completed successfully!");
    } catch (error) {
      console.error("Warning: Error closing Redis connection:", error);
    }
  }
}

main();

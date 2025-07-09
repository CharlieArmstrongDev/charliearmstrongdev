#!/usr/bin/env tsx

// Test script to verify tRPC server and Redis integration
// Run with: npx tsx scripts/test-trpc.ts

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), "apps/web/.env.local") });

import { appRouter } from "../apps/web/lib/trpc/server";

async function testTRPCEndpoints() {
  console.log("🧪 Testing tRPC endpoints and Redis integration...\n");

  try {
    // Create a caller (simulates HTTP request)
    const caller = appRouter.createCaller({});

    // Test health check
    console.log("🏥 Testing health endpoint...");
    const health = await caller.health();
    console.log("✅ Health check result:", health);

    // Test blog posts
    console.log("\n📝 Testing blog posts endpoint...");
    const posts = await caller.blog.getPublished();
    console.log(`✅ Found ${posts.length} published blog posts:`);
    posts.forEach((post) => {
      console.log(`   - ${post.title} (${post.slug})`);
    });

    // Test projects
    console.log("\n🚀 Testing projects endpoint...");
    const projects = await caller.projects.getFeatured();
    console.log(`✅ Found ${projects.length} featured projects:`);
    projects.forEach((project) => {
      console.log(`   - ${project.title} (${project.slug})`);
    });

    // Test analytics
    console.log("\n📊 Testing analytics endpoint...");
    const stats = await caller.analytics.getSiteStats();
    console.log("✅ Site statistics:", stats);

    // Test monitoring
    console.log("\n🔍 Testing monitoring endpoint...");
    const redisHealth = await caller.monitoring.redis();
    console.log("✅ Redis monitoring:", redisHealth);

    console.log("\n🎉 All tRPC endpoints are working correctly!");
    console.log("✅ Redis integration is fully functional!");
  } catch (error) {
    console.error("\n❌ tRPC test failed:", error);
    process.exit(1);
  }
}

testTRPCEndpoints();

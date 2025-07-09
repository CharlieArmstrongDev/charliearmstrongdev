#!/usr/bin/env node

// Redis monitoring script for automated health checks
import {
  monitorRedis,
  checkRedisHealth,
} from "../apps/web/lib/monitoring/redis";

async function runMonitoring() {
  console.log("🔍 Starting Redis monitoring...");

  try {
    // Run health check
    const metrics = await checkRedisHealth();

    console.log("📊 Redis Health Check Results:");
    console.log(`  Status: ${metrics.connectionStatus}`);
    console.log(`  Response Time: ${metrics.responseTime}ms`);
    console.log(`  Key Count: ${metrics.keyCount || "N/A"}`);
    console.log(`  Error Rate: ${(metrics.errorRate * 100).toFixed(1)}%`);
    console.log(`  Last Check: ${metrics.lastCheck.toISOString()}`);

    // Run full monitoring (includes alerts)
    await monitorRedis();

    console.log("✅ Redis monitoring completed successfully");
  } catch (error) {
    console.error("❌ Redis monitoring failed:", error);
    process.exit(1);
  }
}

// Run monitoring if script is executed directly
if (require.main === module) {
  runMonitoring().catch(console.error);
}

export { runMonitoring };

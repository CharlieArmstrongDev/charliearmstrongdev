#!/usr/bin/env node

// Redis seeding script - Run with: node scripts/seed-redis.mjs
import { seedRedisData, clearSeedData } from '../apps/web/lib/db/seed.ts'

const command = process.argv[2]

async function main() {
  try {
    switch (command) {
      case 'seed':
        console.log('🌱 Starting Redis seeding process...\n')
        await seedRedisData()
        break
        
      case 'clear':
        console.log('🧹 Starting Redis clearing process...\n')
        await clearSeedData()
        break
        
      case 'reset':
        console.log('🔄 Resetting Redis data...\n')
        await clearSeedData()
        console.log('\n')
        await seedRedisData()
        break
        
      default:
        console.log(`
Redis Data Management Script

Usage:
  node scripts/seed-redis.mjs <command>

Commands:
  seed    - Seed the database with initial data
  clear   - Clear all seed data from the database
  reset   - Clear and re-seed the database

Examples:
  node scripts/seed-redis.mjs seed
  node scripts/seed-redis.mjs reset
        `)
        process.exit(1)
    }
    
    console.log('\n✅ Operation completed successfully!')
    process.exit(0)
    
  } catch (error) {
    console.error('\n❌ Operation failed:', error.message)
    if (process.env.NODE_ENV === 'development') {
      console.error(error.stack)
    }
    process.exit(1)
  }
}

main()

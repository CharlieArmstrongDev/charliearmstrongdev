// Quick script to check Google Analytics setup
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Google Analytics Setup...\n');

// Check .env.local file
const envPath = path.join(__dirname, 'apps', 'web', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const gaIdMatch = envContent.match(/NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=(.+)/);
  
  if (gaIdMatch) {
    const gaId = gaIdMatch[1].trim();
    console.log('✅ Google Analytics configuration found!');
    console.log(`📊 GA4 ID: ${gaId}`);
    
    if (gaId === 'G-XXXXXXXXXX') {
      console.log('⚠️  You need to replace G-XXXXXXXXXX with your actual Measurement ID');
    } else if (gaId.startsWith('G-')) {
      console.log('✅ Valid GA4 Measurement ID format detected!');
    } else {
      console.log('❌ Invalid GA4 Measurement ID format');
    }
  } else {
    console.log('❌ NEXT_PUBLIC_GOOGLE_ANALYTICS_ID not found in .env.local');
  }
} else {
  console.log('❌ .env.local file not found');
}

console.log('\n📝 Next steps:');
console.log('1. Get your actual Measurement ID from Google Analytics');
console.log('2. Replace G-XXXXXXXXXX in .env.local with your real ID');
console.log('3. Restart your development server');
console.log('4. Visit http://localhost:3000/test-analytics to test');
console.log('5. Check Google Analytics Real-time reports for live data');

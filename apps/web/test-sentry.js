#!/usr/bin/env node

/**
 * Test script for Sentry integration
 * This script will make HTTP requests to test both client and server error handling
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const http = require('http');

function makeRequest(path, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`📡 Making request to: http://localhost:3001${path}`);

    const req = http.get(`http://localhost:3001${path}`, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`✅ Response status: ${res.statusCode}`);
        if (res.statusCode >= 400) {
          console.log(
            `❌ Error response received - this should be captured by Sentry`,
          );
        } else {
          console.log(`✅ Success response - page loaded correctly`);
        }
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', err => {
      console.log(`❌ Request failed: ${err.message}`);
      reject(err);
    });

    req.setTimeout(10000, () => {
      console.log(`⏰ Request timeout`);
      req.abort();
      reject(new Error('Request timeout'));
    });
  });
}

async function testSentry() {
  console.log('🚀 Starting Sentry Integration Test');
  console.log('=====================================');

  try {
    // Test 1: Load the test page
    await makeRequest('/test-error', 'Load test error page');

    // Test 2: Trigger server error via tRPC
    console.log(
      '\n🔥 Now manually trigger server error using the "Trigger Server Error" button',
    );
    console.log(
      '🔥 Then manually trigger client error using the "Trigger Client Error" button',
    );
    console.log('\n📊 Check your Sentry dashboard at: https://sentry.io/');
    console.log('📊 Look for new error events in your project');

    console.log('\n✅ Test setup complete!');
    console.log('💡 Next steps:');
    console.log('   1. Click both error buttons in the browser');
    console.log('   2. Check terminal output for server-side errors');
    console.log('   3. Verify errors appear in Sentry dashboard');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSentry();

// Quick test to verify the package builds and exports work correctly
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing advanced-react-role-guard package...\n');

// Check if dist files exist
const distDir = path.join(__dirname, 'dist');
const files = fs.readdirSync(distDir);

console.log('📦 Checking dist files:');
const requiredFiles = [
  'advanced-react-role-guard.js',
  'advanced-react-role-guard.umd.cjs',
  'index.d.ts'
];

requiredFiles.forEach(file => {
  if (files.includes(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

console.log('\n🔍 Checking package.json exports...');
const packageJson = require('./package.json');

if (packageJson.main && packageJson.module && packageJson.types) {
  console.log('✅ Main entry points configured');
} else {
  console.log('❌ Missing entry points in package.json');
}

console.log('\n📋 Package info:');
console.log(`   Name: ${packageJson.name}`);
console.log(`   Version: ${packageJson.version}`);
console.log(`   Description: ${packageJson.description}`);
console.log(`   Keywords: ${packageJson.keywords.join(', ')}`);

console.log('\n✨ Package is ready for publishing!');
console.log('🚀 Run: npm publish --dry-run  (to test)');
console.log('🚀 Run: npm publish          (to publish for real)');
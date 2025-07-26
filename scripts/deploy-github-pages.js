#!/usr/bin/env node

/**
 * GitHub Pages Deployment Script for Don.ai Creative Suite
 * Author: Ratna Kirti
 * 
 * This script handles the complete deployment process to GitHub Pages
 * including building the application and deploying to gh-pages branch.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting GitHub Pages deployment for Don.ai Creative Suite...\n');

try {
  // Step 1: Clean previous builds
  console.log('📦 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('✅ Previous dist folder removed');
  }

  // Step 2: Build the application
  console.log('\n🔨 Building application for production...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');

  // Step 3: Verify dist folder exists
  if (!fs.existsSync('dist')) {
    throw new Error('Build failed: dist folder not found');
  }

  // Step 4: Create CNAME file for custom domain (if needed)
  const cnameFile = path.join('dist', 'CNAME');
  // Uncomment the next line if you have a custom domain
  // fs.writeFileSync(cnameFile, 'your-domain.com');

  // Step 5: Create .nojekyll file to prevent Jekyll processing
  const nojekyllFile = path.join('dist', '.nojekyll');
  fs.writeFileSync(nojekyllFile, '');
  console.log('✅ .nojekyll file created');

  // Step 6: Deploy to GitHub Pages
  console.log('\n🌐 Deploying to GitHub Pages...');
  execSync('gh-pages -d dist --dotfiles', { stdio: 'inherit' });
  
  console.log('\n🎉 Deployment completed successfully!');
  console.log('📱 Your app will be available at: https://your-username.github.io/don-create-code/');
  console.log('⏱️  It may take a few minutes for changes to appear');

} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.error('\n🔧 Troubleshooting tips:');
  console.error('1. Make sure you have committed and pushed your changes');
  console.error('2. Check if GitHub Pages is enabled in repository settings');
  console.error('3. Verify the repository name matches the base path in vite.config.ts');
  console.error('4. Ensure you have proper permissions to push to the repository');
  process.exit(1);
}

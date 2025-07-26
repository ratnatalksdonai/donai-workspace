#!/bin/bash

# Deployment Readiness Check Script for Don.ai Creative Suite
# This script verifies that the application is ready for deployment

echo "🚀 Don.ai Creative Suite - Deployment Readiness Check"
echo "=================================================="

# Check Node.js version
echo "📋 Checking Node.js version..."
node --version

# Check npm version
echo "📋 Checking npm version..."
npm --version

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run TypeScript check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

# Run ESLint
echo "🧹 Running ESLint..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build artifacts exist
if [ -d "dist" ]; then
    echo "✅ Build successful! Files generated:"
    ls -la dist/
else
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

# Check critical files
critical_files=("dist/index.html" "dist/assets")
for file in "${critical_files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ Critical file missing: $file"
        exit 1
    fi
done

echo ""
echo "🎉 Deployment Readiness Check Complete!"
echo "✅ Application is ready for deployment"
echo ""
echo "📝 Deployment Options:"
echo "1. Lovable Platform: Visit https://lovable.dev/projects/aa69d391-4192-4f15-9faa-987c1cc3a71a"
echo "2. Vercel: npx vercel --prod"
echo "3. Netlify: Drag and drop 'dist' folder to Netlify"
echo "4. GitHub Pages: Push to main branch"

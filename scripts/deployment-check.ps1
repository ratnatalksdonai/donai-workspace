# Deployment Readiness Check Script for Don.ai Creative Suite
# This script verifies that the application is ready for deployment

Write-Host "🚀 Don.ai Creative Suite - Deployment Readiness Check" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Check Node.js version
Write-Host "📋 Checking Node.js version..." -ForegroundColor Yellow
node --version

# Check npm version
Write-Host "📋 Checking npm version..." -ForegroundColor Yellow
npm --version

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Run TypeScript check
Write-Host "🔍 Running TypeScript check..." -ForegroundColor Yellow
npx tsc --noEmit

# Run ESLint
Write-Host "🧹 Running ESLint..." -ForegroundColor Yellow
npm run lint

# Build the application
Write-Host "🏗️ Building application..." -ForegroundColor Yellow
npm run build

# Check if build artifacts exist
if (Test-Path "dist") {
    Write-Host "✅ Build successful! Files generated:" -ForegroundColor Green
    Get-ChildItem "dist" | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "❌ Build failed! dist directory not found." -ForegroundColor Red
    exit 1
}

# Check critical files
$criticalFiles = @("dist\index.html", "dist\assets")
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ Critical file missing: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🎉 Deployment Readiness Check Complete!" -ForegroundColor Green
Write-Host "✅ Application is ready for deployment" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Deployment Options:" -ForegroundColor Cyan
Write-Host "1. Lovable Platform: Visit https://lovable.dev/projects/aa69d391-4192-4f15-9faa-987c1cc3a71a" -ForegroundColor White
Write-Host "2. Vercel: npx vercel --prod" -ForegroundColor White
Write-Host "3. Netlify: Drag and drop dist folder to Netlify" -ForegroundColor White
Write-Host "4. GitHub Pages: Push to main branch" -ForegroundColor White

# 🚀 GitHub Pages Deployment Guide for Don.ai Creative Suite

Created by: **Ratna Kirti**

## 📋 Quick Deployment Checklist

### ✅ Prerequisites Completed
- [x] Node.js 18+ installed
- [x] Git configured with GitHub account
- [x] Repository forked/cloned
- [x] Dependencies installed (`npm install`)
- [x] gh-pages package added
- [x] Vite configured for GitHub Pages
- [x] Router configured with basename
- [x] Production build tested

### 🎯 Deployment Steps

#### 1. Repository Setup
```bash
# If you haven't forked yet:
# 1. Go to https://github.com/ratnakiri/don-create-code
# 2. Click "Fork" button
# 3. Clone your fork:
git clone https://github.com/YOUR_USERNAME/don-create-code.git
cd don-create-code
npm install
```

#### 2. Configure Repository Name (if different)
If you renamed your repository, update these files:

**vite.config.ts:**
```typescript
base: mode === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

**src/App.tsx:**
```typescript
const basename = import.meta.env.PROD ? '/YOUR_REPO_NAME' : '';
```

#### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **gh-pages** branch and **/ (root)** folder
5. Click **Save**

#### 4. Deploy Your Application
```bash
# Single command deployment
npm run deploy

# Or use our automated script
npm run deploy:github

# Manual step-by-step
npm run predeploy  # Builds the application
npm run deploy     # Deploys to gh-pages branch
```

#### 5. Access Your Deployed App
Your app will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Example: `https://ratnakiri.github.io/don-create-code/`

## 🛠️ Available Deployment Scripts

| Script | Purpose | Command |
|--------|---------|---------|
| `predeploy` | Builds the app for production | `npm run predeploy` |
| `deploy` | Deploys dist folder to gh-pages | `npm run deploy` |
| `deploy:clean` | Clean deploy with file removal | `npm run deploy:clean` |
| `deploy:github` | Automated deployment script | `npm run deploy:github` |

## 🔧 Configuration Files

### vite.config.ts
```typescript
export default defineConfig(({ mode }) => ({
  // ... other config
  base: mode === 'production' ? '/don-create-code/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          fabric: ['fabric'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog']
        }
      }
    }
  }
}));
```

### package.json Scripts
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "deploy:clean": "gh-pages -d dist --remove \"*.{js,css,html}\" --add",
    "deploy:github": "node scripts/deploy-github-pages.js"
  }
}
```

### src/App.tsx Router Configuration
```typescript
const basename = import.meta.env.PROD ? '/don-create-code' : '';

<BrowserRouter basename={basename}>
  <Routes>
    {navItems.map(({ to, page }) => (
      <Route key={to} path={to} element={page} />
    ))}
  </Routes>
</BrowserRouter>
```

## 🎯 Features Configured for GitHub Pages

- ✅ **SPA Routing**: React Router with proper basename
- ✅ **404 Handling**: Custom 404.html for client-side routing
- ✅ **SEO Optimization**: Updated meta tags and descriptions
- ✅ **Production Build**: Optimized Vite build configuration
- ✅ **Asset Optimization**: Proper chunking and compression
- ✅ **No Jekyll**: .nojekyll file prevents Jekyll processing

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. Blank Page After Deployment
**Problem**: App shows blank page on GitHub Pages
**Solution**: Check if basename is correctly configured in App.tsx

#### 2. 404 on Page Refresh
**Problem**: Direct URLs return 404 errors
**Solution**: Ensure 404.html is in public folder and deployed

#### 3. Assets Not Loading
**Problem**: CSS/JS files return 404
**Solution**: Verify base path in vite.config.ts matches repository name

#### 4. gh-pages Branch Not Created
**Problem**: No gh-pages branch after deployment
**Solution**: 
```bash
# Check if gh-pages package is installed
npm list gh-pages

# Reinstall if needed
npm install --save-dev gh-pages

# Try deployment again
npm run deploy
```

#### 5. Permission Denied Error
**Problem**: Error pushing to gh-pages branch
**Solution**: Ensure you have write access to the repository

### Debug Commands
```bash
# Check build output
npm run build
ls -la dist/

# Verify deployment script
node scripts/deploy-github-pages.js

# Check Git configuration
git config --list

# Verify remote origin
git remote -v
```

## 🌟 Deployment Best Practices

### Before Each Deployment
1. **Test locally**: `npm run preview`
2. **Check build**: `npm run build`
3. **Verify no errors**: `npm run lint`
4. **Test TypeScript**: `npm run type-check`

### After Deployment
1. **Wait 5-10 minutes** for GitHub Pages to update
2. **Clear browser cache** when testing
3. **Test all routes** and functionality
4. **Verify mobile responsiveness**

### Performance Optimization
- Bundle size is optimized with manual chunks
- Assets are compressed and minified
- Unused dependencies are excluded
- Source maps are disabled in production

## 📊 Deployment Analytics

### Bundle Analysis
```bash
# Check bundle size
npm run build

# Analyze with bundle analyzer (if needed)
npm install --save-dev vite-bundle-analyzer
```

### Expected Bundle Sizes
- **vendor chunk**: ~141KB (React, React-DOM)
- **fabric chunk**: ~286KB (Fabric.js library)
- **ui chunk**: ~10KB (Radix UI components)
- **main chunk**: ~1MB (Application code + Transformers.js)

## 🎉 Success!

If everything is configured correctly:
1. Your app builds without errors
2. Deployment completes successfully
3. App is accessible at your GitHub Pages URL
4. All routes work correctly
5. Canvas and AI features function properly

**Live Example**: [https://ratnakiri.github.io/don-create-code/](https://ratnakiri.github.io/don-create-code/)

---

<div align="center">
  <h3>🎨 Happy Deploying!</h3>
  <p>Created with ❤️ by <a href="https://github.com/ratnakiri">Ratna Kirti</a></p>
</div>

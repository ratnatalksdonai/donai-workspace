# Project Setup & Auto-Commit Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Git (if not already done)**
   ```bash
   git init
   git remote add origin <your-repo-url>
   ```

3. **Start Development with Auto-Commit**
   ```bash
   npm run dev:auto
   ```

## Available Scripts

- `npm run dev` - Start development server only
- `npm run dev:auto` - Start development server + auto-commit watcher
- `npm run auto-commit` - Start auto-commit watcher only
- `npm run commit` - Manual commit with prompts
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Auto-Commit Features

### Automatic Commits
- Monitors all files except node_modules, .git, dist, etc.
- Debounces commits (waits 3 seconds after last change)
- Minimum 10 seconds between commits
- Automatically generates commit messages based on file changes
- Auto-pushes to remote repository

### Commit Message Examples
- `feat: add new file ComponentName.tsx`
- `update: modify Canvas.tsx`
- `remove: delete oldFile.js`
- `feat: create directory components/ui`

### Manual Override
Use `npm run commit` for manual commits with custom messages.

## File Watching

The auto-commit system watches:
- ✅ All TypeScript/JavaScript files
- ✅ All React components
- ✅ Configuration files
- ✅ CSS/styling files
- ✅ Documentation files

Ignores:
- ❌ node_modules/
- ❌ dist/
- ❌ .git/
- ❌ *.log files
- ❌ package-lock.json
- ❌ Dotfiles (except .env)

## Troubleshooting

### Git Issues
If auto-commit fails:
1. Check git configuration: `git config --list`
2. Ensure remote is set: `git remote -v`
3. Check authentication: `git push` manually

### File Watching Issues
- Large projects may hit file watching limits
- Restart the watcher: `Ctrl+C` then `npm run dev:auto`

## Security Notes

- The auto-commit system respects .gitignore
- Sensitive files should be added to .gitignore
- Consider using environment variables for secrets

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting development server with auto-commit...\n');

// Start Vite dev server
const viteProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: join(__dirname, '..')
});

// Start auto-commit watcher
const autoCommitProcess = spawn('node', ['scripts/auto-commit.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: join(__dirname, '..')
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  viteProcess.kill('SIGINT');
  autoCommitProcess.kill('SIGINT');
  process.exit(0);
});

viteProcess.on('exit', (code) => {
  console.log(`Vite process exited with code ${code}`);
  autoCommitProcess.kill('SIGINT');
  process.exit(code);
});

autoCommitProcess.on('exit', (code) => {
  console.log(`Auto-commit process exited with code ${code}`);
});

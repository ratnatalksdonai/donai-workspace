import { exec } from 'child_process';
import { promisify } from 'util';
import chokidar from 'chokidar';
import path from 'path';

const execAsync = promisify(exec);

class AutoCommitter {
  constructor() {
    this.debounceTimeout = null;
    this.debounceDelay = 3000; // 3 seconds
    this.lastCommitTime = 0;
    this.minCommitInterval = 10000; // 10 seconds minimum between commits
  }

  async gitAdd() {
    try {
      await execAsync('git add .');
      console.log('✅ Files staged for commit');
    } catch (error) {
      console.error('❌ Error staging files:', error.message);
    }
  }

  async gitCommit(message) {
    try {
      const now = Date.now();
      if (now - this.lastCommitTime < this.minCommitInterval) {
        console.log('⏳ Skipping commit - too soon since last commit');
        return;
      }

      await execAsync(`git commit -m "${message}"`);
      this.lastCommitTime = now;
      console.log(`✅ Committed: ${message}`);
    } catch (error) {
      if (error.message.includes('nothing to commit')) {
        console.log('ℹ️ No changes to commit');
      } else {
        console.error('❌ Error committing:', error.message);
      }
    }
  }

  async gitPush() {
    try {
      await execAsync('git push');
      console.log('✅ Changes pushed to remote');
    } catch (error) {
      console.error('❌ Error pushing:', error.message);
    }
  }

  generateCommitMessage(filePath, eventType) {
    const fileName = path.basename(filePath);
    const fileDir = path.dirname(filePath).replace(process.cwd(), '');
    
    const messages = {
      add: `feat: add new file ${fileName}`,
      change: `update: modify ${fileName}`,
      unlink: `remove: delete ${fileName}`,
      addDir: `feat: create directory ${fileDir}`,
      unlinkDir: `remove: delete directory ${fileDir}`
    };

    return messages[eventType] || `update: ${eventType} ${fileName}`;
  }

  async processChanges(filePath, eventType) {
    const commitMessage = this.generateCommitMessage(filePath, eventType);
    
    await this.gitAdd();
    await this.gitCommit(commitMessage);
    await this.gitPush();
  }

  debounceCommit(filePath, eventType) {
    clearTimeout(this.debounceTimeout);
    
    this.debounceTimeout = setTimeout(() => {
      this.processChanges(filePath, eventType);
    }, this.debounceDelay);
  }

  start() {
    console.log('🚀 Starting auto-commit watcher...');
    
    const watcher = chokidar.watch('.', {
      ignored: [
        /(^|[\/\\])\../, // ignore dotfiles
        'node_modules/**',
        'dist/**',
        '.git/**',
        '**/*.log',
        '**/package-lock.json',
        '**/yarn.lock'
      ],
      persistent: true,
      ignoreInitial: true
    });

    watcher
      .on('add', (path) => {
        console.log(`📄 File added: ${path}`);
        this.debounceCommit(path, 'add');
      })
      .on('change', (path) => {
        console.log(`📝 File changed: ${path}`);
        this.debounceCommit(path, 'change');
      })
      .on('unlink', (path) => {
        console.log(`🗑️ File removed: ${path}`);
        this.debounceCommit(path, 'unlink');
      })
      .on('addDir', (path) => {
        console.log(`📁 Directory added: ${path}`);
        this.debounceCommit(path, 'addDir');
      })
      .on('unlinkDir', (path) => {
        console.log(`📁 Directory removed: ${path}`);
        this.debounceCommit(path, 'unlinkDir');
      })
      .on('error', (error) => {
        console.error('❌ Watcher error:', error);
      });

    process.on('SIGINT', () => {
      console.log('\n👋 Stopping auto-commit watcher...');
      watcher.close();
      process.exit(0);
    });
  }
}

const autoCommitter = new AutoCommitter();
autoCommitter.start();

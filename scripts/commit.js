import { exec } from 'child_process';
import { promisify } from 'util';
import readline from 'readline';

const execAsync = promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function manualCommit() {
  try {
    console.log('📋 Checking git status...');
    const { stdout } = await execAsync('git status --porcelain');
    
    if (!stdout.trim()) {
      console.log('✅ No changes to commit');
      rl.close();
      return;
    }

    console.log('📄 Changes to commit:');
    console.log(stdout);

    const message = await promptUser('💬 Enter commit message: ');
    
    if (!message.trim()) {
      console.log('❌ Commit cancelled - no message provided');
      rl.close();
      return;
    }

    await execAsync('git add .');
    console.log('✅ Files staged');

    await execAsync(`git commit -m "${message}"`);
    console.log('✅ Changes committed');

    const shouldPush = await promptUser('🚀 Push to remote? (y/N): ');
    
    if (shouldPush.toLowerCase() === 'y' || shouldPush.toLowerCase() === 'yes') {
      await execAsync('git push');
      console.log('✅ Changes pushed to remote');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

manualCommit();

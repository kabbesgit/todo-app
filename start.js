// Simple entry point for Web Runner
import { execSync } from 'child_process';

// Get the port from environment variable or use a default
const port = process.env.PORT || 3000;

// Build the application
console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Serve the application
console.log(`Starting the application on port ${port}...`);
try {
  execSync(`npx serve -s dist -l ${port}`, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start the application:', error);
  process.exit(1);
}

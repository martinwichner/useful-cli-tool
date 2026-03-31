#!/usr/bin/env node

import { CLIKernel } from './index.js';
import { Logger } from './services/Logger.js';

/**
 * CLI Entry Point
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    const kernel = new CLIKernel();
    console.log('📦 Useful CLI Tool v1.0.0');
    console.log('\nVerwendung: useful-cli [command] [options]\n');
    kernel.showHelp();
    process.exit(0);
  }

  const commandName = args[0];
  const commandArgs = args.slice(1);

  const kernel = new CLIKernel();
  await kernel.run(commandName, commandArgs);
}

main().catch((error) => {
  Logger.error('Unerwarteter Fehler');
  if (error instanceof Error) {
    Logger.error(error.message);
  }
  process.exit(1);
});

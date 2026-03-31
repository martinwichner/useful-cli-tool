/**
 * Main Index - Öffentliche API des Pakets
 *
 * HINWEIS: Imports mit .js Extension sind erforderlich für ES Modules in Node.js
 * Auch wenn du nur .ts Dateien siehst - das ist die ESM-Spezifikation
 */
export { CLIKernel } from './core/CLIKernel.js';
export { CommandRegistry } from './core/CommandRegistry.js';
export { Logger } from './services/Logger.js';
export type { ICommand } from './types/Command.js';

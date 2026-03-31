import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';

/**
 * Hello Command
 * Prints a welcome message
 */
export class HelloCommand implements ICommand {
  name = 'hello';
  description = 'Displays a welcome message';

  async execute(args: string[]): Promise<void> {
    const name = args[0] || 'World';
    Logger.success(`Hello, ${name}!`);
  }
}

import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';

/**
 * Hello Command - Beispiel Command
 * Gibt eine Willkommensnachricht aus
 */
export class HelloCommand implements ICommand {
  name = 'hello';
  description = 'Zeigt eine Willkommensnachricht';

  async execute(args: string[]): Promise<void> {
    const name = args[0] || 'Welt';
    Logger.success(`Hallo, ${name}!`);
  }
}

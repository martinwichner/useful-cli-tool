import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';

/**
 * List Command
 * Shows available commands
 */
export class ListCommand implements ICommand {
  name = 'list';
  description = 'Displays all available commands';

  async execute(_args: string[]): Promise<void> {
    Logger.info('Use "useful-cli --help" for complete usage instructions');
  }
}

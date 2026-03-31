import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';

/**
 * List Command
 * Zeigt die verfügbaren Commands an
 */
export class ListCommand implements ICommand {
  name = 'list';
  description = 'Zeigt alle verfügbaren Commands an';

  async execute(_args: string[]): Promise<void> {
    Logger.info('Verwende "useful-cli --help" für eine vollständige Übersicht');
  }
}

import { CommandRegistry } from '../core/CommandRegistry.js';
import { ICommand } from '../types/Command.js';

/**
 * Help Command
 * Prints usage and a list of available commands.
 */
export class HelpCommand implements ICommand {
  name = 'help';
  description = 'Displays help for all registered commands';

  constructor(private registry: CommandRegistry) {}

  async execute(_args: string[]): Promise<void> {
    console.log('\n📘 Helpful commands:');
    this.registry.getAll().forEach((command) => {
      console.log(`  ${command.name.padEnd(15)} - ${command.description}`);
    });
    console.log('\nUse `useful-cli-tool <command> --help` for more details.');
  }
}

import { CommandRegistry } from './CommandRegistry.js';
import { Logger } from '../services/Logger.js';
import { HelloCommand } from '../commands/HelloCommand.js';
import { ListCommand } from '../commands/ListCommand.js';
import { CalcCommand } from '../commands/CalcCommand.js';

/**
 * CLI Application Kernel
 * Manages command initialization and execution
 */
export class CLIKernel {
  private registry: CommandRegistry;

  constructor() {
    this.registry = new CommandRegistry();
    this.initializeCommands();
  }

  /**
   * Initializes available commands
   */
  private initializeCommands(): void {
    this.registry.register(new HelloCommand());
    this.registry.register(new ListCommand());
    this.registry.register(new CalcCommand());
  }

  /**
   * Execute a command
   */
  async run(commandName: string, args: string[]): Promise<void> {
    const command = this.registry.get(commandName);

    if (!command) {
      Logger.error(`Command '${commandName}' not found`);
      this.showHelp();
      process.exit(1);
    }

    try {
      await command.execute(args);
    } catch (error) {
      Logger.error(`Error executing '${commandName}'`);
      if (error instanceof Error) {
        Logger.error(error.message);
      }
      process.exit(1);
    }
  }

  /**
   * Shows available commands
   */
  showHelp(): void {
    console.log('\n📚 Available commands:\n');
    this.registry.getAll().forEach((command) => {
      console.log(`  ${command.name.padEnd(15)} - ${command.description}`);
    });
    console.log('\n');
  }

  /**
   * Returns the command registry (for tests and extensions)
   */
  getRegistry(): CommandRegistry {
    return this.registry;
  }
}

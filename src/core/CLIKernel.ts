import { CommandRegistry } from './CommandRegistry.js';
import { Logger } from '../services/Logger.js';
import { HelloCommand } from '../commands/HelloCommand.js';
import { ListCommand } from '../commands/ListCommand.js';

/**
 * CLI Anwendungs-Kernel
 * Verwaltet die Initialisierung und Ausführung von Commands
 */
export class CLIKernel {
  private registry: CommandRegistry;

  constructor() {
    this.registry = new CommandRegistry();
    this.initializeCommands();
  }

  /**
   * Initialisiert alle verfügbaren Commands
   */
  private initializeCommands(): void {
    this.registry.register(new HelloCommand());
    this.registry.register(new ListCommand());
  }

  /**
   * Führt einen Command aus
   */
  async run(commandName: string, args: string[]): Promise<void> {
    const command = this.registry.get(commandName);

    if (!command) {
      Logger.error(`Command '${commandName}' nicht gefunden`);
      this.showHelp();
      process.exit(1);
    }

    try {
      await command.execute(args);
    } catch (error) {
      Logger.error(`Fehler bei Ausführung von '${commandName}'`);
      if (error instanceof Error) {
        Logger.error(error.message);
      }
      process.exit(1);
    }
  }

  /**
   * Zeigt alle verfügbaren Commands an
   */
  showHelp(): void {
    console.log('\n📚 Verfügbare Commands:\n');
    this.registry.getAll().forEach((command) => {
      console.log(`  ${command.name.padEnd(15)} - ${command.description}`);
    });
    console.log('\n');
  }

  /**
   * Gibt die Command Registry zurück (für Tests und Erweiterungen)
   */
  getRegistry(): CommandRegistry {
    return this.registry;
  }
}

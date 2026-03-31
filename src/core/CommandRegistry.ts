import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';

/**
 * Command Registry
 * Manages registration and lookup of available commands
 */
export class CommandRegistry {
  private commands: Map<string, ICommand> = new Map();

  /**
   * Registers a new command
   */
  register(command: ICommand): void {
    this.commands.set(command.name, command);
    Logger.debug(`Command '${command.name}' registered`);
  }

  /**
   * Gets a command by name
   */
  get(name: string): ICommand | undefined {
    return this.commands.get(name);
  }

  /**
   * Checks if a command exists
   */
  exists(name: string): boolean {
    return this.commands.has(name);
  }

  /**
   * Returns all registered commands
   */
  getAll(): ICommand[] {
    return Array.from(this.commands.values());
  }

  /**
   * Returns all command names
   */
  getCommandNames(): string[] {
    return Array.from(this.commands.keys());
  }
}

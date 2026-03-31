import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';

/**
 * Command Registry
 * Verwaltung und Registrierung aller verfügbaren Commands
 */
export class CommandRegistry {
  private commands: Map<string, ICommand> = new Map();

  /**
   * Registriert einen neuen Command
   */
  register(command: ICommand): void {
    this.commands.set(command.name, command);
    Logger.debug(`Command '${command.name}' registriert`);
  }

  /**
   * Gibt einen Command nach Name zurück
   */
  get(name: string): ICommand | undefined {
    return this.commands.get(name);
  }

  /**
   * Prüft, ob ein Command existiert
   */
  exists(name: string): boolean {
    return this.commands.has(name);
  }

  /**
   * Gibt alle registrierten Commands zurück
   */
  getAll(): ICommand[] {
    return Array.from(this.commands.values());
  }

  /**
   * Gibt alle Command-Namen zurück
   */
  getCommandNames(): string[] {
    return Array.from(this.commands.keys());
  }
}

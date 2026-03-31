/**
 * Command Interface
 * Definiert die Schnittstelle für alle CLI Commands
 */
export interface ICommand {
  name: string;
  description: string;
  execute(args: string[]): Promise<void>;
}

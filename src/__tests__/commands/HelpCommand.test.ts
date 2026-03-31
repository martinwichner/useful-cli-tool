import { CommandRegistry } from '../../core/CommandRegistry';
import { HelloCommand } from '../../commands/HelloCommand';
import { HelpCommand } from '../../commands/HelpCommand';

describe('HelpCommand', () => {
  it('should have correct metadata', () => {
    const registry = new CommandRegistry();
    const cmd = new HelpCommand(registry);

    expect(cmd.name).toBe('help');
    expect(cmd.description).toBe('Displays help for all registered commands');
  });

  it('should print a list of registered commands', async () => {
    const registry = new CommandRegistry();
    registry.register(new HelloCommand());
    const cmd = new HelpCommand(registry);

    const log = jest.spyOn(console, 'log').mockImplementation();

    await cmd.execute([]);

    expect(log).toHaveBeenCalledWith('\n📘 Helpful commands:');
    expect(log).toHaveBeenCalledWith(expect.stringContaining('hello'));
    expect(log).toHaveBeenCalledWith('\nUse `useful-cli-tool <command> --help` for more details.');

    log.mockRestore();
  });
});
import { InitCommand } from '../../commands/InitCommand';
import { Logger } from '../../services/Logger';

jest.mock('../../services/Logger');

describe('InitCommand', () => {
  it('registers and runs in non-interactive mode with --yes', async () => {
    const cmd = new InitCommand();

    await cmd.execute(['--yes']);

    expect(Logger.info).toHaveBeenCalledWith('Starting interactive initialization wizard...');
    expect(Logger.success).toHaveBeenCalledWith('Initialization complete');
    expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Final package settings'));
  });
});
import { CLIKernel } from '../../core/CLIKernel';
import { Logger } from '../../services/Logger';

jest.mock('../../services/Logger');

describe('CLIKernel', () => {
  let kernel: CLIKernel;
  let processExitSpy: jest.SpyInstance;

  beforeEach(() => {
    kernel = new CLIKernel();
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    processExitSpy.mockRestore();
  });

  describe('initialization', () => {
    it('registers commands during initialization', () => {
      const registry = kernel.getRegistry();
      expect(registry.exists('hello')).toBe(true);
      expect(registry.exists('list')).toBe(true);
    });
  });

  describe('run', () => {
    it('executes a known command', async () => {
      const spyShowHelp = jest.spyOn(kernel, 'showHelp').mockImplementation();
      await kernel.run('hello', ['World']);
      expect(processExitSpy).not.toHaveBeenCalled();
      spyShowHelp.mockRestore();
    });

    it('shows help on unknown command', async () => {
      const spyShowHelp = jest.spyOn(kernel, 'showHelp').mockImplementation();
      await kernel.run('unknown', []);
      expect(Logger.error).toHaveBeenCalled();
      expect(spyShowHelp).toHaveBeenCalled();
      expect(processExitSpy).toHaveBeenCalledWith(1);
      spyShowHelp.mockRestore();
    });
  });

  describe('showHelp', () => {
    it('prints available commands', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      kernel.showHelp();
      expect(consoleLogSpy).toHaveBeenCalled();
      consoleLogSpy.mockRestore();
    });
  });

  describe('getRegistry', () => {
    it('returns the command registry', () => {
      const registry = kernel.getRegistry();
      expect(registry).toBeDefined();
      expect(registry.exists('hello')).toBe(true);
    });
  });
});

import { CommandRegistry } from '../../core/CommandRegistry';
import { ICommand } from '../../types/Command';

describe('CommandRegistry', () => {
  let registry: CommandRegistry;

  beforeEach(() => {
    registry = new CommandRegistry();
  });

  describe('register', () => {
    it('sollte einen Command registrieren', () => {
      const mockCommand: ICommand = {
        name: 'test',
        description: 'Test Command',
        execute: jest.fn(),
      };

      registry.register(mockCommand);
      expect(registry.exists('test')).toBe(true);
    });

    it('sollte mehrere Commands registrieren', () => {
      const command1: ICommand = {
        name: 'cmd1',
        description: 'Command 1',
        execute: jest.fn(),
      };
      const command2: ICommand = {
        name: 'cmd2',
        description: 'Command 2',
        execute: jest.fn(),
      };

      registry.register(command1);
      registry.register(command2);

      expect(registry.getCommandNames()).toHaveLength(2);
      expect(registry.exists('cmd1')).toBe(true);
      expect(registry.exists('cmd2')).toBe(true);
    });
  });

  describe('get', () => {
    it('sollte einen registrierten Command zurückgeben', () => {
      const mockCommand: ICommand = {
        name: 'test',
        description: 'Test Command',
        execute: jest.fn(),
      };

      registry.register(mockCommand);
      const retrieved = registry.get('test');

      expect(retrieved).toEqual(mockCommand);
    });

    it('sollte undefined zurückgeben für unbekannte Commands', () => {
      expect(registry.get('nonexistent')).toBeUndefined();
    });
  });

  describe('exists', () => {
    it('sollte true zurückgeben wenn Command existiert', () => {
      const mockCommand: ICommand = {
        name: 'test',
        description: 'Test Command',
        execute: jest.fn(),
      };

      registry.register(mockCommand);
      expect(registry.exists('test')).toBe(true);
    });

    it('sollte false zurückgeben wenn Command nicht existiert', () => {
      expect(registry.exists('nonexistent')).toBe(false);
    });
  });

  describe('getAll', () => {
    it('sollte alle registrierten Commands zurückgeben', () => {
      const command1: ICommand = {
        name: 'cmd1',
        description: 'Command 1',
        execute: jest.fn(),
      };
      const command2: ICommand = {
        name: 'cmd2',
        description: 'Command 2',
        execute: jest.fn(),
      };

      registry.register(command1);
      registry.register(command2);

      const allCommands = registry.getAll();
      expect(allCommands).toHaveLength(2);
      expect(allCommands).toContain(command1);
      expect(allCommands).toContain(command2);
    });

    it('sollte leeres Array zurückgeben wenn keine Commands registriert sind', () => {
      expect(registry.getAll()).toEqual([]);
    });
  });

  describe('getCommandNames', () => {
    it('sollte alle Command-Namen zurückgeben', () => {
      const command1: ICommand = {
        name: 'hello',
        description: 'Hello Command',
        execute: jest.fn(),
      };
      const command2: ICommand = {
        name: 'goodbye',
        description: 'Goodbye Command',
        execute: jest.fn(),
      };

      registry.register(command1);
      registry.register(command2);

      const names = registry.getCommandNames();
      expect(names).toContain('hello');
      expect(names).toContain('goodbye');
    });
  });
});

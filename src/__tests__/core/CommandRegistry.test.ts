import { CommandRegistry } from '../../core/CommandRegistry';
import { ICommand } from '../../types/Command';

describe('CommandRegistry', () => {
  let registry: CommandRegistry;

  beforeEach(() => {
    registry = new CommandRegistry();
  });

  describe('register', () => {
    it('registers a command', () => {
      const mockCommand: ICommand = {
        name: 'test',
        description: 'Test Command',
        execute: jest.fn(),
      };

      registry.register(mockCommand);
      expect(registry.exists('test')).toBe(true);
    });

    it('registers multiple commands', () => {
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
    it('returns a registered command', () => {
      const mockCommand: ICommand = {
        name: 'test',
        description: 'Test Command',
        execute: jest.fn(),
      };

      registry.register(mockCommand);
      const retrieved = registry.get('test');

      expect(retrieved).toEqual(mockCommand);
    });

    it('returns undefined for unknown commands', () => {
      expect(registry.get('nonexistent')).toBeUndefined();
    });
  });

  describe('exists', () => {
    it('returns true when command exists', () => {
      const mockCommand: ICommand = {
        name: 'test',
        description: 'Test Command',
        execute: jest.fn(),
      };

      registry.register(mockCommand);
      expect(registry.exists('test')).toBe(true);
    });

    it('returns false when command does not exist', () => {
      expect(registry.exists('nonexistent')).toBe(false);
    });
  });

  describe('getAll', () => {
    it('returns all registered commands', () => {
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

    it('returns empty array when no commands are registered', () => {
      expect(registry.getAll()).toEqual([]);
    });
  });

  describe('getCommandNames', () => {
    it('returns all command names', () => {
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

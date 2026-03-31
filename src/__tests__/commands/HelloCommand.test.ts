import { HelloCommand } from '../../commands/HelloCommand';
import { Logger } from '../../services/Logger';

jest.mock('../../services/Logger');

describe('HelloCommand', () => {
  let helloCommand: HelloCommand;

  beforeEach(() => {
    helloCommand = new HelloCommand();
    jest.clearAllMocks();
  });

  describe('properties', () => {
    it('should have correct name', () => {
      expect(helloCommand.name).toBe('hello');
    });

    it('should have a description', () => {
      expect(helloCommand.description).toBe('Displays a welcome message');
    });
  });

  describe('execute', () => {
    it('should print a welcome message with provided name', async () => {
      await helloCommand.execute(['Alice']);
      expect(Logger.success).toHaveBeenCalledWith('Hello, Alice!');
    });

    it('should default to World when no name provided', async () => {
      await helloCommand.execute([]);
      expect(Logger.success).toHaveBeenCalledWith('Hello, World!');
    });

    it('should use first argument as name', async () => {
      await helloCommand.execute(['Bob', 'ExtraArg']);
      expect(Logger.success).toHaveBeenCalledWith('Hello, Bob!');
    });
  });
});

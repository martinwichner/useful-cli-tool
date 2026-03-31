import { ListCommand } from '../../commands/ListCommand';
import { Logger } from '../../services/Logger';

jest.mock('../../services/Logger');

describe('ListCommand', () => {
  let listCommand: ListCommand;

  beforeEach(() => {
    listCommand = new ListCommand();
    jest.clearAllMocks();
  });

  describe('properties', () => {
    it('should have correct name', () => {
      expect(listCommand.name).toBe('list');
    });

    it('should have a description', () => {
      expect(listCommand.description).toBe(
        'Displays all available commands'
      );
    });
  });

  describe('execute', () => {
    it('should output an info log', async () => {
      await listCommand.execute([]);
      expect(Logger.info).toHaveBeenCalled();
    });
  });
});

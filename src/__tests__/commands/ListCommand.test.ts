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
    it('sollte den korrekten Namen haben', () => {
      expect(listCommand.name).toBe('list');
    });

    it('sollte eine Beschreibung haben', () => {
      expect(listCommand.description).toBe(
        'Zeigt alle verfügbaren Commands an'
      );
    });
  });

  describe('execute', () => {
    it('sollte einen Info-Log ausgeben', async () => {
      await listCommand.execute([]);
      expect(Logger.info).toHaveBeenCalled();
    });
  });
});

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
    it('sollte den korrekten Namen haben', () => {
      expect(helloCommand.name).toBe('hello');
    });

    it('sollte eine Beschreibung haben', () => {
      expect(helloCommand.description).toBe('Zeigt eine Willkommensnachricht');
    });
  });

  describe('execute', () => {
    it('sollte eine Willkommensnachricht mit übergebenem Namen anzeigen', async () => {
      await helloCommand.execute(['Alice']);
      expect(Logger.success).toHaveBeenCalledWith('Hallo, Alice!');
    });

    it('sollte "Welt" als Standard-Name verwenden', async () => {
      await helloCommand.execute([]);
      expect(Logger.success).toHaveBeenCalledWith('Hallo, Welt!');
    });

    it('sollte den ersten Argument als Namen verwenden', async () => {
      await helloCommand.execute(['Bob', 'ExtraArg']);
      expect(Logger.success).toHaveBeenCalledWith('Hallo, Bob!');
    });
  });
});

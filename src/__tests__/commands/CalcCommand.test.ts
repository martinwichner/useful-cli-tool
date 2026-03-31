import { CalcCommand } from '../../commands/CalcCommand';
import { Logger } from '../../services/Logger';

jest.mock('../../services/Logger');

describe('CalcCommand', () => {
  let calcCommand: CalcCommand;

  beforeEach(() => {
    calcCommand = new CalcCommand();
    jest.clearAllMocks();
  });

  describe('properties', () => {
    it('should have correct name', () => {
      expect(calcCommand.name).toBe('calc');
    });

    it('should have a description', () => {
      expect(calcCommand.description).toBe('Performs basic arithmetic operations (+, -, *, /)');
    });
  });

  describe('execute', () => {
    describe('valid operations', () => {
      it('should perform addition', async () => {
        await calcCommand.execute(['5', '+', '3']);
        expect(Logger.success).toHaveBeenCalledWith('5 + 3 = 8');
      });

      it('should perform subtraction', async () => {
        await calcCommand.execute(['10', '-', '4']);
        expect(Logger.success).toHaveBeenCalledWith('10 - 4 = 6');
      });

      it('should perform multiplication', async () => {
        await calcCommand.execute(['6', '*', '7']);
        expect(Logger.success).toHaveBeenCalledWith('6 * 7 = 42');
      });

      it('should perform division', async () => {
        await calcCommand.execute(['15', '/', '3']);
        expect(Logger.success).toHaveBeenCalledWith('15 / 3 = 5');
      });

      it('should handle decimal numbers', async () => {
        await calcCommand.execute(['3.5', '+', '2.1']);
        expect(Logger.success).toHaveBeenCalledWith('3.5 + 2.1 = 5.6');
      });
    });

    describe('error handling', () => {
      it('should show usage when too few arguments', async () => {
        await calcCommand.execute(['5', '+']);
        expect(Logger.error).toHaveBeenCalledWith('Usage: calc <number> <operator> <number>');
        expect(Logger.info).toHaveBeenCalledWith('Supported operators: +, -, *, /');
      });

      it('should show usage when too many arguments', async () => {
        await calcCommand.execute(['5', '+', '3', 'extra']);
        expect(Logger.error).toHaveBeenCalledWith('Usage: calc <number> <operator> <number>');
        expect(Logger.info).toHaveBeenCalledWith('Supported operators: +, -, *, /');
      });

      it('should handle invalid first number', async () => {
        await calcCommand.execute(['abc', '+', '5']);
        expect(Logger.error).toHaveBeenCalledWith('Invalid numbers provided');
      });

      it('should handle invalid second number', async () => {
        await calcCommand.execute(['5', '+', 'xyz']);
        expect(Logger.error).toHaveBeenCalledWith('Invalid numbers provided');
      });

      it('should handle unsupported operator', async () => {
        await calcCommand.execute(['5', '%', '3']);
        expect(Logger.error).toHaveBeenCalledWith('Unsupported operator: %');
        expect(Logger.info).toHaveBeenCalledWith('Supported operators: +, -, *, /');
      });

      it('should prevent division by zero', async () => {
        await calcCommand.execute(['10', '/', '0']);
        expect(Logger.error).toHaveBeenCalledWith('Division by zero is not allowed');
      });
    });
  });
});
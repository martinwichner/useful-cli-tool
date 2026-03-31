import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';

/**
 * Calc Command
 * Performs basic arithmetic operations
 */
export class CalcCommand implements ICommand {
  name = 'calc';
  description = 'Performs basic arithmetic operations (+, -, *, /)';

  async execute(args: string[]): Promise<void> {
    if (args.length !== 3) {
      Logger.error('Usage: calc <number> <operator> <number>');
      Logger.info('Supported operators: +, -, *, /');
      return;
    }

    const [num1Str, operator, num2Str] = args;
    const num1 = parseFloat(num1Str);
    const num2 = parseFloat(num2Str);

    if (isNaN(num1) || isNaN(num2)) {
      Logger.error('Invalid numbers provided');
      return;
    }

    let result: number;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          Logger.error('Division by zero is not allowed');
          return;
        }
        result = num1 / num2;
        break;
      default:
        Logger.error(`Unsupported operator: ${operator}`);
        Logger.info('Supported operators: +, -, *, /');
        return;
    }

    Logger.success(`${num1} ${operator} ${num2} = ${result}`);
  }
}
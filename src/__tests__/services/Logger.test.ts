import { Logger } from '../../services/Logger';

describe('Logger Service', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('info', () => {
    it('should log info messages with ℹ prefix', () => {
      Logger.info('Test message');
      expect(consoleLogSpy).toHaveBeenCalledWith('ℹ  Test message');
    });
  });

  describe('success', () => {
    it('should log success messages with ✓ prefix', () => {
      Logger.success('Operation successful');
      expect(consoleLogSpy).toHaveBeenCalledWith('✓  Operation successful');
    });
  });

  describe('warn', () => {
    it('should log warning messages with ⚠ prefix', () => {
      Logger.warn('Warning');
      expect(consoleWarnSpy).toHaveBeenCalledWith('⚠  Warning');
    });
  });

  describe('error', () => {
    it('should log error messages with ✗ prefix', () => {
      Logger.error('An error occurred');
      expect(consoleErrorSpy).toHaveBeenCalledWith('✗  An error occurred');
    });
  });

  describe('debug', () => {
    it('should not log when DEBUG is not set', () => {
      delete process.env.DEBUG;
      Logger.debug('Debug message');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should log debug messages when DEBUG is set', () => {
      process.env.DEBUG = 'true';
      Logger.debug('Debug message');
      expect(consoleLogSpy).toHaveBeenCalledWith('🐛 Debug message');
      delete process.env.DEBUG;
    });
  });
});

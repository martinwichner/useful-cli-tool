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
    it('sollte eine Info-Nachricht mit ℹ Präfix ausgeben', () => {
      Logger.info('Test Nachricht');
      expect(consoleLogSpy).toHaveBeenCalledWith('ℹ  Test Nachricht');
    });
  });

  describe('success', () => {
    it('sollte eine Success-Nachricht mit ✓ Präfix ausgeben', () => {
      Logger.success('Operation erfolgreich');
      expect(consoleLogSpy).toHaveBeenCalledWith('✓  Operation erfolgreich');
    });
  });

  describe('warn', () => {
    it('sollte eine Warn-Nachricht mit ⚠ Präfix ausgeben', () => {
      Logger.warn('Warnung');
      expect(consoleWarnSpy).toHaveBeenCalledWith('⚠  Warnung');
    });
  });

  describe('error', () => {
    it('sollte eine Error-Nachricht mit ✗ Präfix ausgeben', () => {
      Logger.error('Fehler aufgetreten');
      expect(consoleErrorSpy).toHaveBeenCalledWith('✗  Fehler aufgetreten');
    });
  });

  describe('debug', () => {
    it('sollte nichts ausgeben wenn DEBUG nicht gesetzt ist', () => {
      delete process.env.DEBUG;
      Logger.debug('Debug Nachricht');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('sollte Debug-Nachricht ausgeben wenn DEBUG gesetzt ist', () => {
      process.env.DEBUG = 'true';
      Logger.debug('Debug Nachricht');
      expect(consoleLogSpy).toHaveBeenCalledWith('🐛 Debug Nachricht');
      delete process.env.DEBUG;
    });
  });
});

import { InitCommand } from '../../commands/InitCommand';
import { Logger } from '../../services/Logger';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

jest.mock('../../services/Logger');

describe('InitCommand', () => {
  let originalCwd: string;
  let tempDir: string;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'useful-cli-init-'));
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('registers and runs in non-interactive mode with --yes', async () => {
    const cmd = new InitCommand();

    await cmd.execute(['--yes']);

    expect(Logger.info).toHaveBeenCalledWith('Starting interactive initialization wizard...');
    expect(Logger.success).toHaveBeenCalledWith('Initialization complete');
    expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('Final package settings'));

    const projectPath = path.join(tempDir, 'my-new-project');
    const packageJsonPath = path.join(projectPath, 'package.json');

    const stat = await fs.stat(projectPath);
    expect(stat.isDirectory()).toBe(true);

    const packageJsonContent = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    expect(packageJsonContent.name).toBe('my-new-project');
    expect(packageJsonContent.version).toBe('1.0.0');
  });
});
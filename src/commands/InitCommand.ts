import { ICommand } from '../types/Command.js';
import { Logger } from '../services/Logger.js';
import readline from 'readline';

export interface InitStepContext {
  projectName?: string;
  template?: string;
  useGit?: boolean;
}

export interface InitStep {
  id: string;
  label: string;
  defaultValue?: string;
  run(context: InitStepContext, value: string): Promise<void>;
}

class ProjectNameStep implements InitStep {
  id = 'project-name';
  label = 'Project name';
  defaultValue = 'my-new-project';

  async run(context: InitStepContext, value: string): Promise<void> {
    const projectName = value || this.defaultValue;
    context.projectName = projectName;
    Logger.success(`Project name set to '${projectName}'`);
  }
}

class TemplateStep implements InitStep {
  id = 'template';
  label = 'Template';
  defaultValue = 'basic';

  async run(context: InitStepContext, value: string): Promise<void> {
    const template = value || this.defaultValue;
    context.template = template;
    Logger.success(`Template selected: '${template}'`);
  }
}

class GitInitStep implements InitStep {
  id = 'git-init';
  label = 'Initialize git repository';
  defaultValue = 'yes';

  async run(context: InitStepContext, value: string): Promise<void> {
    const useGit = value?.toLowerCase() !== 'no';
    context.useGit = useGit;
    if (useGit) {
      Logger.success('Git initialization enabled');
    } else {
      Logger.warn('Git initialization skipped');
    }
  }
}

/**
 * Init Command
 * Interactive project initialization wizard with modular steps
 */
export class InitCommand implements ICommand {
  name = 'init';
  description = 'Initialize a new project with interactive step-by-step selections';

  private steps: InitStep[] = [new ProjectNameStep(), new TemplateStep(), new GitInitStep()];

  registerStep(step: InitStep): void {
    this.steps.push(step);
  }

  async execute(args: string[]): Promise<void> {
    const nonInteractive = args.includes('--yes') || args.includes('-y');
    const context: InitStepContext = {};

    Logger.info('Starting interactive initialization wizard...');

    for (const step of this.steps) {
      const rawAnswer = nonInteractive ? step.defaultValue || '' : await this.askQuestion(`${step.label} (${step.defaultValue}) > `);

      await step.run(context, rawAnswer.trim());
    }

    Logger.success('Initialization complete');
    Logger.info(`Final package settings: ${JSON.stringify(context, null, 2)}`);
  }

  private askQuestion(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }
}

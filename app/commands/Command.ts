import {Logger} from '../logger';

export interface CommandConfig {
  logger?: Logger;
}

export interface Command {
  commandName: () => string;
  question: () => {name: string; value: string};
  run: (config?: CommandConfig) => Promise<void>;
}

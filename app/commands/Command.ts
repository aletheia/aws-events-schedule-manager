import {Logger} from '../logger';

export interface CommandConfig {
  logger?: Logger;
}

export interface CommandInterface {
  commandName(): string;
  prompt(): {name: string; value: string};
  execute(config?: CommandConfig): Promise<void>;
}

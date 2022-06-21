import chalk from 'chalk';
import {Logger} from '../logger';

export const exitProgram = async (logger: Logger) => {
  logger.info(chalk.blue('Goodbye!'));
};

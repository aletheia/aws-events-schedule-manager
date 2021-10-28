import chalk from 'chalk';
import {Logger} from '../logger';
import {Command} from './Command';

export const exitProgram = async (logger: Logger) => {
  logger.info('Goodbye!');
};

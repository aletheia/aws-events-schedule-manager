import chalk from 'chalk';
import {AppConfig} from '../config';
import {configureAppSync, fetchSessions} from '../graphql';
import {Logger, LoggerConfig} from '../logger';
import {saveSessions} from '../sessions';
import {Command, CommandConfig} from './Command';

export const saveUserBookedSessions = async (
  logger: Logger,
  config: AppConfig,
  outputFile: string
) => {
  logger.info(chalk.blue('Saving sessions to file...'));

  logger.info('Fetching session data from re:Invent portal...');
  await configureAppSync(config);
  // logger.info('...loggin into the portal...');
  // await logIn(username, password);
  logger.info('...fetching user sessions');
  const sessions = await fetchSessions();
  logger.info('...done');

  logger.info('Saving sessions to file...');
  await saveSessions(sessions, outputFile);
  logger.info('...done');
};
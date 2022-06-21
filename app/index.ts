#! /usr/bin/env node
import inquirer from 'inquirer';
import {Logger} from './logger';
import {exitProgram} from './commands/exit';
import {AppConfig, downloadConfig} from './config';
import {authenticateUserCommand} from './commands/log_in_user';
import {selectEvent} from './commands/select_event';

import chalk from 'chalk';
import {configureAppSync, fetchReservedSessions} from './graphql';

import {Event, SerializedSession, User} from './interfaces';
import {saveSessionCommand} from './commands/save_sessions';
import {fetchSessionsCommand} from './commands/fetch_sessions';

export interface CommandState {
  user?: User;
  event?: Event;
  sessions?: SerializedSession[];
}

export const interactiveCommand = async (logger: Logger, config: AppConfig) => {
  await authenticateUserCommand(logger, config);
  const event = await selectEvent(logger);
  configureAppSync(config);
  const sessions = await fetchSessionsCommand(logger, config, event);
  await saveSessionCommand(logger, config, sessions);

  exitProgram(logger);
};

const init = async (config: AppConfig, logger: Logger) => {
  try {
    logger.log(chalk.cyan('AWS Events - Sessions Manager'));
  } catch (e) {
    const error = e as Error;
    logger.error(error.message);
  }

  try {
    await interactiveCommand(logger, config);
  } catch (e) {
    const error = e as Error;
    logger.error(error.message);
  }
};

(async () => {
  const logger = new Logger();
  try {
    const config = await downloadConfig(logger);
    await init(config, logger);
  } catch (e) {
    const error = e as Error;
    logger.error(error.message);
  }
})();

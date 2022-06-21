import chalk from 'chalk';
import inquirer from 'inquirer';
import {AppConfig} from '../config';
import {SerializedSession} from '../interfaces';

import {Logger} from '../logger';
import {saveSessions} from '../sessions';

export const saveSessionCommand = async (
  logger: Logger,
  config: AppConfig,
  sessions: SerializedSession[]
) => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'fileName',
      message: 'Enter the file name to save sessions to',
    },
    {
      type: 'list',
      name: 'format',
      message: 'Enter the file format',
      choices: ['CSV', 'ICS'],
    },
  ]);
  const fileName = answers.fileName;
  if (fileName.length === 0) {
    logger.error('File name cannot be empty');
  }
  const format = answers.format;

  logger.info(chalk.blue('Saving sessions to file...'));

  logger.info('Saving sessions to file...');
  await saveSessions(sessions, fileName, format);
  logger.info('...done');
};

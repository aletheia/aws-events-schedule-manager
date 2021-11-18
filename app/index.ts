#! /usr/bin/env node
import inquirer from 'inquirer';
import {Logger} from './logger';
import {saveUserBookedSessions} from './commands/save_sessions';
import {exitProgram} from './commands/exit';
import {AppConfig, downloadConfig} from './config';
import {authenticateUser} from './commands/log_in_user';

const init = async (config: AppConfig, logger: Logger) => {
  let answers;
  try {
    logger.log('re:Invent 2021 - Sessions Manager');
  } catch (e) {
    const error = e as Error;
    logger.error(error.message);
  }

  try {
    await authenticateUser(logger, config);
    const saveUserSessionOption = 'Save user reserved sessions';
    const exitOption = 'Exit';
    answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'command',
        message: 'What do you want to do?',
        choices: [saveUserSessionOption, exitOption],
      },
    ]);

    const doSaveSessions = async () => {
      answers = await inquirer.prompt([
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

      await saveUserBookedSessions(logger, config, fileName, format);
    };

    switch (answers.command) {
      case saveUserSessionOption:
        await doSaveSessions();
        break;
      case 'Exit':
        await exitProgram(logger);
    }
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

import chalk from 'chalk';
import inquirer from 'inquirer';
import {AppConfig} from '../config';
import {fetchBookmarkedSessions, fetchReservedSessions} from '../graphql';
import {Event, SerializedSession} from '../interfaces';
import {Logger} from '../logger';

export const fetchSessionsCommand = async (
  logger: Logger,
  config: AppConfig,
  event: Event
): Promise<SerializedSession[]> => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'sessionType',
      message: 'Wich kind of sessions do you want to fetch?',
      choices: [
        {
          name: 'Reserved Sessions',
          value: 'reserved',
        },
        {
          name: 'Bookmarked Sessions',
          value: 'bookmarked',
        },
      ],
    },
  ]);

  const doFetchReservedSessions = async () => {
    return await fetchReservedSessions(event);
  };
  const doFetchBookmarkedSessions = async () => {
    return await fetchBookmarkedSessions(event);
  };

  logger.info(chalk.blue('Fetching sessions..'));
  let sessions;
  switch (answers.sessionType) {
    case 'reserved':
      sessions = await doFetchReservedSessions();
      break;
    case 'bookmarked':
      sessions = await doFetchBookmarkedSessions();
      break;
    default:
      throw new Error('Unknown session type');
  }
  return sessions;
};

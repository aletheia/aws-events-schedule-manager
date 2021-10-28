import inquirer from 'inquirer';
import {configureCognito, logIn} from '../auth';
import {AppConfig} from '../config';
import {Logger} from '../logger';
import {Command, CommandConfig} from './Command';

export const authenticateUser = async (logger: Logger, config: AppConfig) => {
  logger.debug(
    'Logging into re:Invent portal with your registered username and password'
  );

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
    },
  ]);
  const username = answers['username'];
  const password = answers['password'];

  if (!username || !password) {
    throw new Error('Missing username or password');
  }

  logger.debug(`Logging in user ${username}`);

  await configureCognito({
    identityPoolId: config.publicWebApp.identityPoolId,
    identityPoolRegion: config.region,
    userPoolId: config.cognito.userPoolId,
    userPoolWebClientId: config.cognito.userPoolWebClientId,
    region: config.region,
  });

  const loggedInUser = await logIn(username, password);
  logger.info(
    `Welcome back ${loggedInUser.attributes.given_name} ${loggedInUser.attributes.family_name}`
  );
};

import {configureCognito, logIn} from './auth';
import {downloadConfig} from './config';
import * as dotenv from 'dotenv';
import {configureAppSync, fetchSessions} from './graphql';
import {saveSessions} from './sessions';

(async () => {
  dotenv.config();
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  try {
    if (!username || !password) {
      throw new Error('Missing username or password');
    }
    const config = await downloadConfig();
    // console.log(config);
    await configureCognito({
      identityPoolId: config.publicWebApp.identityPoolId,
      region: config.region,
      identityPoolRegion: config.region,
      userPoolId: config.cognito.userPoolId,
      userPoolWebClientId: config.cognito.userPoolWebClientId,
    });
    await configureAppSync(config);

    await logIn(username, password);

    const sessions = await fetchSessions();
    console.log(sessions);
    await saveSessions(sessions);
  } catch (e) {
    console.error(e);
  }
})();

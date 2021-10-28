import axios from 'axios';
import {Logger} from './logger';
const configUrl = 'https://portal.awsevents.com/config/config.json';

export interface AppConfig {
  region: string;
  publicWebApp: {
    identityPoolId: string;
  };
  cognito: {
    userPoolId: string;
    userPoolWebClientId: string;
  };
  graphqlpublic: {
    endpoint: string;
  };
}

export const downloadConfig = async (logger: Logger) => {
  logger.debug('Downloading config from ' + configUrl);
  const response = await axios.get(configUrl);
  return response.data as AppConfig;
};

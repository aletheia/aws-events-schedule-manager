import axios from 'axios';
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

export const downloadConfig = async () => {
  const response = await axios.get(configUrl);
  return response.data as AppConfig;
};

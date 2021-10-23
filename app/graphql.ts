import Amplify, {API} from 'aws-amplify';
import {AppConfig} from './config';
import {listUserSessions} from './gql_queries';

const reInventEventId = 'b84dca69-6995-4e60-bc3f-7bb7a6d170d1';

export const configureAppSync = (config: AppConfig) => {
  const appSyncConfig = {
    aws_appsync_graphqlEndpoint: config.graphqlpublic.endpoint,
    aws_appsync_region: 'us-east-1',
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  };
  Amplify.configure(appSyncConfig);
};

export const fetchSessions = async () => {
  const result = (await API.graphql({
    query: listUserSessions,
    variables: {
      eventId: reInventEventId,
      input: {eventId: reInventEventId, maxResults: 100},
    },
  })) as any;
  return result.data.event.mySessions;
};

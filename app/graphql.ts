import Amplify, {API} from 'aws-amplify';
import {AppConfig} from './config';
import {listAttendeeCalendarSessions, listUserSessions} from './gql_queries';
import {Event, SerializedSession} from './interfaces';

export const fetchEventsList = async (): Promise<{[k: string]: Event}> => {
  return {
    reinvent2022: {
      key: 'reinvent2022',
      name: 're:Invent 2022',
      uuid: '53b5de8d-7b9d-4fcc-a178-6433641075fe',
    },
    remars2022: {
      key: 'remars2022',
      name: 're:Mars 2022',
      uuid: '9aa32fdf-be09-4418-8a14-c800e2a616e3',
    },
    reinvent2021: {
      key: 'reinvent2021',
      name: 're:Invent 2021',
      uuid: 'b84dca69-6995-4e60-bc3f-7bb7a6d170d1',
    },
  };
};

export const configureAppSync = (config: AppConfig) => {
  const appSyncConfig = {
    aws_appsync_graphqlEndpoint: config.graphqlpublic.endpoint,
    aws_appsync_region: 'us-east-1',
    aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  };
  Amplify.configure(appSyncConfig);
};

export const fetchReservedSessions = async (event: Event) => {
  const result = (await API.graphql({
    query: listUserSessions,
    variables: {
      eventId: event.uuid,
      input: {eventId: event.uuid, maxResults: 100},
    },
  })) as any;
  return result.data.event.mySessions.items as SerializedSession[];
};

export const fetchBookmarkedSessions = async (event: Event) => {
  const result = (await API.graphql({
    query: listAttendeeCalendarSessions,
    variables: {
      eventId: event.uuid,
      input: {eventId: event.uuid, maxResults: 100},
    },
  })) as any;

  return result.data.event.myFavorites.items as SerializedSession[];
};

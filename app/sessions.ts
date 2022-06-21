import {writeFileSync} from 'fs';
import * as ics from 'ics';

import {SerializedSession, Session} from './interfaces';

process.env.TZ = 'America/Los_Angeles';

export const saveSessions = async (
  sessions: SerializedSession[],
  filename: string,
  format: string
) => {
  //   const {mySessions, myFavorites, myUserSessions} = sessions;
  let booked: Session[] = sessions
    // .concat(myFavorites.items)
    // .concat(myUserSessions.items)
    .map((session: SerializedSession) => {
      const {venue, room} = session;
      return {
        name: session.alias,
        title: session.name,
        description: session.description,
        location:
          venue && room ? venue.name + ': ' + room.name : 'Not specified',
        start: new Date(session.startTime),
        end: new Date(session.endTime),
      };
    });
  booked = booked.sort(
    (a: Session, b: Session) => a.start.getTime() - b.start.getTime()
  );

  let content = '';

  switch (format) {
    case 'CSV':
      content = formatAsCsv(booked);
      break;
    case 'ICS':
      content = formatAsIcs(booked);
      break;
  }

  writeFileSync(filename, content);
};

function formatAsCsv(sessions: any): string {
  const csvSanitize = (str: string) => str.replace(/,/g, '');

  return (
    'name,title,start,end,location\n' +
    sessions
      .map((session: any) => {
        if (!session) {
          console.log('session is null');
          return '';
        } else
          return `${session.name},${csvSanitize(session.title)},${
            session.start
          },${session.end},${csvSanitize(session.location)}`;
      })
      .join('\n')
  );
}

function formatAsIcs(sessions: any): string {
  const icsEvents = sessions.map((session: any) => {
    return {
      title: session.name + ': ' + session.title,
      description: session.description,
      location: session.location,
      startInputType: '',
      start: [
        session.start.getFullYear(),
        session.start.getMonth() + 1,
        session.start.getDate(),
        session.start.getHours(),
        session.start.getMinutes(),
      ],
      endInputType: '',
      end: [
        session.end.getFullYear(),
        session.end.getMonth() + 1,
        session.end.getDate(),
        session.end.getHours(),
        session.end.getMinutes(),
      ],
    };
  });

  return ics.createEvents(icsEvents).value ?? '';
}

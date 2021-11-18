import {writeFileSync} from 'fs';
import * as ics from 'ics';

process.env.TZ = 'America/Los_Angeles';

export const saveSessions = async (
  sessions: any,
  filename: string,
  format: string
) => {
  //   const {mySessions, myFavorites, myUserSessions} = sessions;
  const booked = sessions.items
    // .concat(myFavorites.items)
    // .concat(myUserSessions.items)
    .map((session: any) => {
      return {
        name: session.alias,
        title: session.name,
        description: session.description,
        location: session.room.venue.name + ': ' + session.room.name,
        start: new Date(session.startTime),
        end: new Date(session.endTime),
      };
    })
    .sort(
      (a: {start: Date}, b: {start: Date}) =>
        a.start.getTime() - b.start.getTime()
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
    'name,title,start,end\n' +
    sessions
      .map((session: any) => {
        return `${session.name},${csvSanitize(session.title)},${
          session.start
        },${session.end}`;
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

import {writeFileSync} from 'fs';

export const saveSessions = async (sessions: any, filename: string) => {
  //   const {mySessions, myFavorites, myUserSessions} = sessions;
  const csvSanitize = (str: string) => str.replace(/,/g, '');
  const booked = sessions.items
    // .concat(myFavorites.items)
    // .concat(myUserSessions.items)
    .map((session: any) => {
      return {
        name: session.alias,
        title: session.name,
        start: new Date(session.startTime),
        end: new Date(session.endTime),
      };
    })
    .sort(
      (a: {start: Date}, b: {start: Date}) =>
        a.start.getTime() - b.start.getTime()
    );

  const csv =
    'name,title,start,end\n' +
    booked
      .map((session: any) => {
        return `${session.name},${csvSanitize(session.title)},${
          session.start
        },${session.end}`;
      })
      .join('\n');

  writeFileSync(filename, csv);
};

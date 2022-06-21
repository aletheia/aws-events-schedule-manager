import inquirer from 'inquirer';
import {fetchEventsList} from '../graphql';
import {Event} from '../interfaces';
import {Logger} from '../logger';

export const selectEvent = async (logger: Logger): Promise<Event> => {
  logger.debug('Fetching events list from AWS Events portal...');
  const events = await fetchEventsList();
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'event',
      message: 'Select an event:',
      choices: Object.values(events).map((event: Event) => {
        return {
          name: event.name,
          value: event.key,
        };
      }),
    },
  ]);

  const selectedEvent = events[answer['event']];

  if (!selectedEvent) {
    throw new Error('No event selected');
  }
  return selectedEvent;
};

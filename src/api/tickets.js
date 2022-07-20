import { restApiClient } from ".";

export const fetchTicketsByEventId = eventId => {
  if (!eventId) return;

  return restApiClient.get(`/events/${eventId}/tickets`);
};

import { restApiClient } from ".";

//Broadcasting
export const fetchBoradcastingStatus = () => {
  return restApiClient.get(`/broadcastState`);
};

export const broadcastListing = (eventIds, isBroadcasting) => {
  return restApiClient.put(`/updateManagedEventStatus/${isBroadcasting}`, {
    eventIds: eventIds
  });
};

// export const unBroadcastListing = (eventId, isBroadcasting) => {
//   if (!isBroadcasting) isBroadcasting = 0
//   return eventId
//     ? restApiClient.get(
//         `/updateManagedEventStatus/${eventId}/${isBroadcasting}`
//       )
//     : restApiClient.get(`/updateManagedEventStatus`)
// }

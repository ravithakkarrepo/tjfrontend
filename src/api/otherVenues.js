import { restApiClient } from ".";

//Other Venues
export const createOtherVenue = venue => {
  if (!venue) throw new Error("An venue object is null!");
  return restApiClient.post(`/createOtherVenue`, venue);
};

export const deleteOtherVenue = venueId => {
  if (!venueId) throw new Error("An keyword is null!");

  return restApiClient.delete(`/deleteEVenue/${venueId}`);
};

export const fetchOtherVenues = venueParam => {
  if (!venueParam) venueParam = { typeKey: "other" };
  return restApiClient.post(`/getAllManagedVenue`, venueParam);
};

export const updateOtherVenue = (newVenue, venueId) => {
  if (!newVenue) throw new Error("An empty venue!");
  return restApiClient.put(`/updateOtherVenue/${venueId}`, newVenue);
};

import { restApiClient } from ".";

//Managed venue
export const createManagedVenue = venue => {
  if (!venue) throw new Error("An venue object is null!");

  return restApiClient.post(`/createManagedVenues`, venue);
};

export const deleteManagedVenue = venueIds => {
  if (!venueIds) throw new Error("An keyword is null!");

  return restApiClient.post(`/deleteManagedVenues`, venueIds);
};

export const fetchManagedVenue = () => {
  return restApiClient.get(`/getManagedVenues`);
};

export const fetchManagedVenueByPaging = venueParam => {
  return restApiClient.post(`/getManagedVenuesByPaging`, venueParam);
};

export const fetchManagedVenueSearch = venueParam => {
  return restApiClient.post(`/getAllManagedVenue`, venueParam, {
    params: {
      page: venueParam.index,
      limit: venueParam.limit
    }
  });
};

export const updateManagedVenue = (newVenue, venueId) => {
  if (!newVenue) throw new Error("An empty venue!");

  return restApiClient.put(`/updateManagedVenue/${venueId}`, newVenue);
};

export const searchSkyboxVenue = venue => {
  return restApiClient.post(`/searchSkyboxVenue`, {
    venue
  });
};

export const updatePriceMarkupPctForVenue = (venueId, newPrice) => {
  if (!venueId) throw new Error("An venueId is null!");

  return restApiClient.put(
    `/updatePriceMarkupPctForEvenue/${venueId}`,
    newPrice
  );
};

export const searchManagedVenue = keyword => {
  return restApiClient.get(`/searchManagedVenues`, {
    params: {
      keyword
    }
  });
};

export const updateVenueIsBlackListed = (venueId, is_blacklist) => {
  return restApiClient.delete(`/blackListManagedVenue/${venueId}`, {
    params: {
      is_blacklist
    }
  });
};

export const fetchDuplicateVenueSearch = venueParam => {
  return restApiClient.post(`/getAllDuplicateVenues`, venueParam, {
    params: {
      page: venueParam.index,
      limit: venueParam.limit
    }
  });
};

export const updateVenueBySkyboxVenueId = queryParams => {
  return restApiClient.put(
    `/updateVenueBySkyboxVenueId`,
    {},
    { params: { ...queryParams } }
  );
};

export const bulkUpdatePriceLET = venueObj => {
  return restApiClient.put(`/bulkUpdatePriceLET/`, venueObj);
};

import { restApiClient } from ".";

export const fetchPromos = () => {
  return restApiClient.get("/getPromos");
};

export const addPromo = promo => {
  if (!promo) return;

  return restApiClient.post("/addPromo", promo);
};

export const deletePromo = promoId => {
  if (!promoId) return;

  return restApiClient.post(`/deletePromo/${promoId}`);
};

export const deletePromos = promoIds => {
  if (!promoIds) return;

  return restApiClient.post(`/deletePromos`, promoIds);
};

//For EVent Promos

export const fetchEventPromos = () => {
  return restApiClient.get("/getupdatePromoForEvent");
};

export const addEventPromo = promos => {
  if (!promos) return;

  return restApiClient.post(`/updatePromoForEvent`, promos);
};

export const deleteEventPromoFromPromotion = promos => {
  if (!promos) return;

  return restApiClient.put(`/deleteEventPromo`, promos.body);
};

export const deleteEventPromoFromAddPromo = promos => {
  if (!promos) return;

  return restApiClient.post(`/deleteupdatePromoForEvent`, promos);
};

//For Available Promos

export const fetchAvailableEventPromos = () => {
  return restApiClient.get("/getAvailableOffers");
};

export const fetchEventAvailablePromos = eventId => {
  return restApiClient.get(`/getPromoAvailableList/${eventId}`);
};

export const fetchEventByPromoName = offerName => {
  return restApiClient.post(`/getEventsByPromoName`, offerName);
};

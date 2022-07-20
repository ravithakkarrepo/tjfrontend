import { createAction } from "redux-actions";

export const FETCH_PROMOS_REQUEST = "FETCH_PROMOS_REQUEST";
export const fetchPromosRequest = createAction(FETCH_PROMOS_REQUEST);
export const FETCH_PROMOS_SUCCESS = "FETCH_PROMOS_SUCCESS";
export const fetchPromosSuccess = createAction(FETCH_PROMOS_SUCCESS);

export const DELETE_PROMOS_REQUEST = "DELETE_PROMOS_REQUEST";
export const deletePromosRequest = createAction(DELETE_PROMOS_REQUEST);

export const ADD_PROMO_REQUEST = "ADD_PROMO_REQUEST";
export const addPromoRequest = createAction(ADD_PROMO_REQUEST);

export const ADD_PROMO_SUCCESS = "ADD_PROMO_SUCCESS";
export const addPromoSuccess = createAction(ADD_PROMO_SUCCESS);

//For Event promos

export const FETCH_EVENT_PROMOS_REQUEST = "FETCH_EVENT_PROMOS_REQUEST";
export const fetchEventPromosRequest = createAction(FETCH_EVENT_PROMOS_REQUEST);
export const FETCH_EVENT_PROMOS_SUCCESS = "FETCH_EVENT_PROMOS_SUCCESS";
export const fetchEventPromosSuccess = createAction(FETCH_EVENT_PROMOS_SUCCESS);

export const DELETE_EVENT_PROMOS_FROM_PROMOTION_REQUEST =
  "DELETE_EVENT_PROMOS_FROM_PROMOTION_REQUEST";
export const deleteEventPromosFromPromotionRequest = createAction(
  DELETE_EVENT_PROMOS_FROM_PROMOTION_REQUEST
);

export const DELETE_EVENT_PROMOS_FROM_ADD_PROMO_REQUEST =
  "DELETE_EVENT_PROMOS_FROM_ADD_PROMO_REQUEST";
export const deleteEventPromosFromAddPromoRequest = createAction(
  DELETE_EVENT_PROMOS_FROM_ADD_PROMO_REQUEST
);

export const ADD_EVENT_PROMO_REQUEST = "ADD_EVENT_PROMO_REQUEST";
export const addEventPromoRequest = createAction(ADD_EVENT_PROMO_REQUEST);

//For Available offers

export const FETCH_AVAILABLE_EVENT_PROMOS_REQUEST =
  "FETCH_AVAILABLE_EVENT_PROMOS_REQUEST";
export const fetchAvailableEventPromosRequest = createAction(
  FETCH_AVAILABLE_EVENT_PROMOS_REQUEST
);
export const FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS =
  "FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS";
export const fetchAvailableEventPromosSuccess = createAction(
  FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS
);

export const FETCH_EVENT_BY_PROMOS_REQUEST = "FETCH_EVENT_BY_PROMOS_REQUEST";
export const fetchEventsByPromoNameRequest = createAction(
  FETCH_EVENT_BY_PROMOS_REQUEST
);
export const FETCH_EVENT_BY_PROMOS_SUCCESS = "FETCH_EVENT_BY_PROMOS_SUCCESS";
export const fetchEventsByPromoNameSuccess = createAction(
  FETCH_EVENT_BY_PROMOS_SUCCESS
);

export const UPDATE_EVENT_BY_PROMO_NAMES = "UPDATE_EVENT_BY_PROMO_NAMES";
export const updateEventByPromoNames = createAction(
  UPDATE_EVENT_BY_PROMO_NAMES
);

// From event monitoring
export const FETCH_EVENT_AVAILABLE_PROMOS_REQUEST =
  "FETCH_EVENT_AVAILABLE_PROMOS_REQUEST";
export const fetchEventAvailablePromoRequest = createAction(
  FETCH_EVENT_AVAILABLE_PROMOS_REQUEST
);

export const FETCH_EVENT_AVAILABLE_PROMOS_SUCCESS =
  "FETCH_EVENT_AVAILABLE_PROMOS_SUCCESS";
export const fetchEventAvailablePromoSuccess = createAction(
  FETCH_EVENT_AVAILABLE_PROMOS_SUCCESS
);

export const CLEAR_AVAILABLE_PROMO_NAMES = "CLEAR_AVAILABLE_PROMO_NAMES";
export const clearAvailablePromoNames = createAction(
  CLEAR_AVAILABLE_PROMO_NAMES
);

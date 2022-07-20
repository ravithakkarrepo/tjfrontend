import { createAction } from "redux-actions";

//MANAGED_venue events
export const CREATE_OTHER_VENUE_REQUEST = "CREATE_OTHER_VENUE_REQUEST";
export const CREATE_OTHER_VENUE_SUCCESS = "CREATE_OTHER_VENUE_SUCCESS";
export const CREATE_OTHER_VENUE_FAILURE = "CREATE_OTHER_VENUE_FAILURE";

export const createOtherVenueRequest = createAction(CREATE_OTHER_VENUE_REQUEST);
export const createOtherVenueSuccess = createAction(CREATE_OTHER_VENUE_SUCCESS);
export const createOtherVenueFailure = createAction(CREATE_OTHER_VENUE_FAILURE);

export const UPDATE_BLACKLIST_OTHER_VENUE_REQUEST =
  "UPDATE_BLACKLIST_OTHER_VENUE_REQUEST";

export const updateIsBlackListOtherVenueRequest = createAction(
  UPDATE_BLACKLIST_OTHER_VENUE_REQUEST
);

export const DELETE_OTHER_VENUE_REQUEST = "DELETE_OTHER_VENUE_REQUEST";
export const DELETE_OTHER_VENUE_SUCCESS = "DELETE_OTHER_VENUE_REQUEST";
export const DELETE_OTHER_VENUE_FAILURE = "DELETE_OTHER_VENUE_REQUEST";

export const deleteOtherVenueRequest = createAction(DELETE_OTHER_VENUE_REQUEST);
export const deleteOtherVenueSuccess = createAction(DELETE_OTHER_VENUE_REQUEST);

export const FETCH_OTHER_VENUES_REQUEST = "FETCH_OTHER_VENUES_REQUEST";
export const FETCH_OTHER_VENUES_SUCCESS = "FETCH_OTHER_VENUES_SUCCESS";

export const fetchOtherVenuesRequest = createAction(FETCH_OTHER_VENUES_REQUEST);
export const fetchOtherVenuesSuccess = createAction(FETCH_OTHER_VENUES_SUCCESS);

export const UPDATE_OTHER_VENUE_REQUEST = "UPDATE_OTHER_VENUE_REQUEST";
export const UPDATE_OTHER_VENUE_SUCCESS = "UPDATE_OTHER_VENUE_SUCCESS";

export const updateOtherVenueRequest = createAction(UPDATE_OTHER_VENUE_REQUEST);
export const updateOtherVenueSuccess = createAction(UPDATE_OTHER_VENUE_SUCCESS);

export const SET_SELECTED_OTHER_VENUE = "SET_SELECTED_OTHER_VENUE";
export const setSelectedOtherVenue = createAction(SET_SELECTED_OTHER_VENUE);

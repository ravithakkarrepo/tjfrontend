import { createAction } from "redux-actions";

export const USER_AUTHORIZATION_REQUEST = "USER_AUTHORIZATION_REQUEST";
export const USER_AUTHORIZATION_SUCCESS = "USER_AUTHORIZATION_SUCCESS";
export const USER_AUTHORIZATION_FAILURE = "USER_AUTHORIZATION_FAILURE";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";

export const userAuthorizationRequest = createAction(
  USER_AUTHORIZATION_REQUEST
);
export const userAuthorizationSuccess = createAction(
  USER_AUTHORIZATION_SUCCESS
);
export const userAuthorizationFailure = createAction(
  USER_AUTHORIZATION_FAILURE
);

export const USER_AUTHORIZATION_BY_GOOGLE_REQUEST =
  "USER_AUTHORIZATION_BY_GOOGLE_REQUEST";
export const USER_AUTHORIZATION_BY_GOOGLE_SUCCESS =
  "USER_AUTHORIZATION_BY_GOOGLE_SUCCESS";
export const USER_AUTHORIZATION_BY_GOOGLE_FAILURE =
  "USER_AUTHORIZATION_BY_GOOGLE_FAILURE";

export const userAuthorizationByGoogleRequest = createAction(
  USER_AUTHORIZATION_BY_GOOGLE_REQUEST
);
export const userAuthorizationByGoogleSuccess = createAction(
  USER_AUTHORIZATION_BY_GOOGLE_SUCCESS
);
export const userAuthorizationByGoogleFailure = createAction(
  USER_AUTHORIZATION_BY_GOOGLE_FAILURE
);

export const userLogOut = createAction(USER_LOGOUT);
export const userLogOutRequest = createAction(USER_LOGOUT_REQUEST);

export const USER_UPDATE_PROFILE_REQUEST = "USER_UPDATE_PROFILE_REQUEST";
export const userUpdateProfileRequest = createAction(
  USER_UPDATE_PROFILE_REQUEST
);

export const FETCH_USER_PROFILE_REQUEST = "FETCH_USER_PROFILE_REQUEST";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";

export const fetchUserProfileRequest = createAction(FETCH_USER_PROFILE_REQUEST);
export const fetchUserProfileSuccess = createAction(FETCH_USER_PROFILE_SUCCESS);

export const FETCH_JOCKEY_ACCOUNTS_REQUEST = "FETCH_JOCKEY_ACCOUNTS_REQUEST";
export const FETCH_JOCKEY_ACCOUNTS_SUCCESS = "FETCH_JOCKEY_ACCOUNTS_SUCCESS";

export const fetchJockeyAccountsRequest = createAction(
  FETCH_JOCKEY_ACCOUNTS_REQUEST
);
export const fetchJockeyAccountsSuccess = createAction(
  FETCH_JOCKEY_ACCOUNTS_SUCCESS
);

export const CLOCK_IN_CLOCK_OUT_IN_USER_SUCCESS =
  "CLOCK_IN_CLOCK_OUT_IN_USER_SUCCESS";

export const updateJockeyAccounts = createAction(
  CLOCK_IN_CLOCK_OUT_IN_USER_SUCCESS
);

export const UPDATE_USER_FOR_BREAK_REQUEST = "UPDATE_USER_FOR_BREAK_REQUEST";
export const updateUserForBreakRequest = createAction(
  UPDATE_USER_FOR_BREAK_REQUEST
);

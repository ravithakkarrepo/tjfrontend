import {
  USER_AUTHORIZATION_REQUEST,
  USER_AUTHORIZATION_SUCCESS,
  USER_AUTHORIZATION_FAILURE,
  USER_LOGOUT,
  USER_LOGOUT_REQUEST,
  FETCH_JOCKEY_ACCOUNTS_SUCCESS,
  FETCH_USER_PROFILE_SUCCESS,
  CLOCK_IN_CLOCK_OUT_IN_USER_SUCCESS,
  USER_AUTHORIZATION_BY_GOOGLE_REQUEST,
  USER_AUTHORIZATION_BY_GOOGLE_FAILURE,
  USER_AUTHORIZATION_BY_GOOGLE_SUCCESS
} from "../actions/users";

const initialState = {
  userProfileInfo: {},
  userInfo: {},
  token: "",
  hasLoggedIn: false,
  allJockeyUsers: []
};

const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_AUTHORIZATION_REQUEST:
      return initialState;
    case USER_AUTHORIZATION_SUCCESS:
      return {
        ...state,
        hasLoggedIn: true,
        userInfo: payload.account,
        token: payload.token
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileInfo: payload
      };
    case FETCH_JOCKEY_ACCOUNTS_SUCCESS:
      return {
        ...state,
        allJockeyUsers: payload
      };

    case CLOCK_IN_CLOCK_OUT_IN_USER_SUCCESS:
      return {
        ...state,
        allJockeyUsers: state.allJockeyUsers.map(obj => {
          if (obj._id.toString() === payload.userInfo._id.toString()) {
            return payload.userInfo;
          }
          return obj;
        }),
        userInfo: payload.userInfo
      };

    case USER_AUTHORIZATION_BY_GOOGLE_REQUEST:
      return initialState;
    case USER_AUTHORIZATION_BY_GOOGLE_SUCCESS:
      localStorage.setItem(
        "googleauth",
        new Date(
          Date.now() + 3600 * 1000 * (payload.sessionLogoutTimeInMinutes / 60)
        ).valueOf() // making dynamic time by taking minutes from user
        // new Date(Date.now() + 3600 * 1000 * 24).valueOf() // For 24 hours
        // new Date(Date.now() + 3600 * 20).valueOf() // 1 Min
      );
      localStorage.setItem("expiryIn", payload.sessionExpiryCheckTimeInMinutes);
      return {
        ...state,
        hasLoggedIn: true,
        userInfo: payload.account,
        token: payload.token
      };

    case USER_AUTHORIZATION_BY_GOOGLE_FAILURE:
      return {
        ...state,
        hasLoggedIn: false
      };

    case USER_AUTHORIZATION_FAILURE:
    case USER_LOGOUT_REQUEST:
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;

export const getHasLoggedIn = state => state.hasLoggedIn;
export const getUserInfo = state => state.userInfo;
export const getUserProfileInfo = state => state.userProfileInfo;
export const getAccessToken = state => state.token;
export const getAllJockeyAccounts = state => state.allJockeyUsers;

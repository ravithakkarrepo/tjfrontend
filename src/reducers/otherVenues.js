import * as actions from "../actions/otherVenues";

const initialState = {
  otherVenues: {
    othervenues: {},
    eventsByOtherVenues: {},
    totalVenues: 0,
    page: 1
  },
  selectedOtherVenue: {}
};

const otherVenues = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_OTHER_VENUES_SUCCESS:
      return {
        ...state,
        otherVenues: {
          ...state.otherVenues,
          othervenues: action.payload.othervenues,
          totalVenues: action.payload.totalVenues,
          page: action.payload.page
        }
      };

    case actions.SET_SELECTED_OTHER_VENUE:
      return {
        ...state,
        selectedOtherVenue: action.payload
      };

    default:
      return state;
  }
};

export default otherVenues;

export const getOtherVenues = state => state.otherVenues;
export const getSelectedOtherVenue = state => state.selectedOtherVenue;

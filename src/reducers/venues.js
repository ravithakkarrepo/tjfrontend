import * as actions from "../actions/venues";

const initialState = {
  managedVenues: {
    venues: {},
    eventsByVenue: {}, //keyword(venue) --> managedEvents
    searchVenue: [],
    skyBoxVenueDup: [],
    tmSearchVenue: [],
    searchVenueInSkybox: [],
    isCalledFromCreateVenue: false
  },
  duplicateVenuesQueue: {
    duplicateVenues: [],
    page: 1,
    totalListing: 0
  }
};

const venues = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MANAGED_VENUE_SUCCESS:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: action.payload }
      };
    case actions.SEARCH_SKYBOX_VENUE_FAILED:
      return {
        ...state,
        managedVenues: {
          ...state.managedVenues,
          searchVenue: [action.payload.venue],
          isCalledFromCreateVenue: action.payload.isCalledFromCreateVenue
        }
      };
    case actions.SEARCH_SKYBOX_VENUE_MODAL_CLOSE:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, searchVenue: [] }
      };
    case actions.OPEN_SKYBOX_VENUE_DUP_MODAL:
      return {
        ...state,
        managedVenues: {
          ...state.managedVenues,
          skyBoxVenueDup: action.payload
        }
      };
    case actions.SELECT_MODAL_SKYBOX_VENUE:
      return {
        ...state,
        managedVenues: {
          ...state.managedVenues,
          skyBoxVenueDup: [],
          isCalledFromCreateVenue: false
        }
      };
    case actions.CLOSE_MODAL_SKYBOX_VENUE:
      return {
        ...state,
        managedVenues: {
          ...state.managedVenues,
          skyBoxVenueDup: [],
          isCalledFromCreateVenue: false
        }
      };
    case actions.FETCH_MANAGED_VENUE_PAGING_SUCCESS:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: action.payload }
      };
    case actions.CLEAR_MANAGED_VENUES:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: { venueInfo: [] } }
      };
    case actions.FETCH_MANAGED_VENUE_SEARCH_SUCCESS:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, venues: action.payload }
      };
    case actions.SEARCH_VENUE_SUCCESS:
      return {
        ...state,
        managedVenues: { ...state.managedVenues, tmSearchVenue: action.payload }
      };
    case actions.SEARCH_VENUE_IN_SKYBOX_SUCCESS:
      return {
        ...state,
        managedVenues: {
          ...state.managedVenues,
          searchVenueInSkybox: action.payload
        }
      };
    case actions.FETCH_DUPLICATE_VENUE_SEARCH_SUCCESS:
      return {
        ...state,
        duplicateVenuesQueue: {
          duplicateVenues: action.payload.venueList,
          page: action.payload.page,
          totalListing: action.payload.totalVenues
        }
      };
    case actions.BULK_UPDATE_PRICE_LET_SUCCESS:
      const { venueIds, let_pricing, is_let } = action.payload;
      let existingVenues = state.managedVenues.venues.venueInfo;

      venueIds.forEach(_id => {
        const objIndex = existingVenues.findIndex(obj => obj._id === _id);
        existingVenues[objIndex].let_pricing = let_pricing;
        existingVenues[objIndex].is_let = is_let;
      });

      return {
        ...state,
        venues: existingVenues
      };
    default:
      return state;
  }
};

export default venues;

export const getManagedVenues = state => state.managedVenues["venues"];
export const getSearchVenueData = state => state.managedVenues["searchVenue"];
export const getSkyBoxVenuesDup = state =>
  state.managedVenues["skyBoxVenueDup"];
export const getisCalledFromCreateVenue = state =>
  state.managedVenues["isCalledFromCreateVenue"];
export const getSearchManagedVenue = state =>
  state.managedVenues["tmSearchVenue"];
export const getSearchVenueInSkyBox = state =>
  state.managedVenues["searchVenueInSkybox"];
export const getDuplicateVenues = state => state.duplicateVenuesQueue;

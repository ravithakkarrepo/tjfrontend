import {
  FETCH_PROMOS_SUCCESS,
  FETCH_EVENT_PROMOS_SUCCESS,
  FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS,
  FETCH_EVENT_AVAILABLE_PROMOS_SUCCESS,
  CLEAR_AVAILABLE_PROMO_NAMES,
  FETCH_EVENT_BY_PROMOS_SUCCESS,
  UPDATE_EVENT_BY_PROMO_NAMES,
  ADD_PROMO_SUCCESS
} from "../actions/promos";

const promos = (
  state = {
    ids: [],
    dict: {},
    eventPromos: [],
    availablePromos: [],
    eventAvailablePromoNames: [],
    eventsByPromoNames: []
  },
  action
) => {
  switch (action.type) {
    case FETCH_PROMOS_SUCCESS:
      return action.payload;
    case FETCH_EVENT_PROMOS_SUCCESS:
      return { ...state, eventPromos: action.payload };
    case FETCH_AVAILABLE_EVENT_PROMOS_SUCCESS:
      return { ...state, availablePromos: action.payload };
    case FETCH_EVENT_AVAILABLE_PROMOS_SUCCESS:
      return { ...state, eventAvailablePromoNames: action.payload };
    case CLEAR_AVAILABLE_PROMO_NAMES:
      return { ...state, eventAvailablePromoNames: [] };
    case FETCH_EVENT_BY_PROMOS_SUCCESS:
      return { ...state, eventsByPromoNames: action.payload };
    case UPDATE_EVENT_BY_PROMO_NAMES:
      return {
        ...state,
        eventsByPromoNames: state.eventsByPromoNames.filter(
          e => e._id.toString() !== action.payload.eventDBId.toSting()
        )
      };
    case ADD_PROMO_SUCCESS:
      const {
        isComingFromEventPromo,
        isComingFromAddNewEventPromo
      } = action.payload;
      const objIndex = state.eventPromos.findIndex(
        obj =>
          obj.eventId === action.payload.eventDBId ||
          obj._id === action.payload.eventDBId
      );
      let newEventInfo = [...state.eventPromos];
      let updatedPromos;

      if (isComingFromEventPromo) {
        updatedPromos = action.payload.promos;
      } else if (isComingFromAddNewEventPromo) {
        updatedPromos = {
          ...newEventInfo[objIndex].promos,
          ...action.payload.promos
        };
      }

      if (action.payload.isPromoDeleted) {
        let keys = Object.keys(action.payload.promos);
        delete newEventInfo[objIndex].promos[keys[0]]; // delete promo key
      } else {
        newEventInfo[objIndex].promos = updatedPromos; // adding promos
      }
      if (Object.keys(newEventInfo[objIndex].promos).length <= 0)
        newEventInfo[objIndex].promos = null;

      if (newEventInfo[objIndex].promos) {
        newEventInfo[objIndex].promoName = Object.keys(
          newEventInfo[objIndex].promos
        );
        newEventInfo[objIndex].promoCode = Object.values(
          newEventInfo[objIndex].promos
        );
      } else {
        newEventInfo[objIndex].promoName = "";
        newEventInfo[objIndex].promoCode = "";
      }
      return {
        ...state,
        eventPromos: newEventInfo
      };
    default:
      return state;
  }
};

export default promos;
export const getPromos = state => state.dict;
export const getEventPromos = state => state.eventPromos;
export const getAvailablePromos = state => state.availablePromos;
export const getEventAvailablePromoNames = state =>
  state.eventAvailablePromoNames;
export const getEvetsByPromoNames = state => state.eventsByPromoNames;

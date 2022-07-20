import {
  APP_START_FETCHING,
  APP_STOP_FETCHING,
  EVENT_START_FETCHING,
  EVENT_STOP_FETCHING,
  PRICE_START_FETCHING,
  PRICE_STOP_FETCHING,
  APP_CLEAR_ERROR,
  APP_RECEIVE_ERROR,
  APP_RECEIVE_ALERT,
  APP_CLEAR_ALERT,
  INIT_WEB_SOCKET_SUCCESS,
  RESETPASSWORD_STOP_FETCHING,
  RESETPASSWORD_START_FETCHING,
  UPDATE_PROFILE_START_FETCHING,
  UPDATE_PROFILE_STOP_FETCHING,
  BLACKLIST_START_FETCHING,
  BLACKLIST_STOP_FETCHING,
  ADDBLACKLIST_START_FETCHING,
  ADDBLACKLIST_STOP_FETCHING,
  EVENT_QUEUE_START_FETCHING,
  EVENT_QUEUE_STOP_FETCHING,
  UNMATCHED_EVENT_START_FETCHING,
  UNMATCHED_EVENT_STOP_FETCHING,
  ORDERFLOW_START_FETCHING,
  ORDERFLOW_STOP_FETCHING,
  EVENT_AVAILABLE_PROMO_START_FETCHING,
  EVENT_AVAILABLE_PROMO_STOP_FETCHING,
  EVENT_PROMO_START_FETCHING,
  EVENT_PROMO_STOP_FETCHING,
  OPEN_ORDER_START_FETCHING,
  OPEN_ORDER_STOP_FETCHING,
  MIS_MATCHED_EVENT_START_FETCHING,
  MIS_MATCHED_EVENT_STOP_FETCHING,
  DUPLICATE_EVENTS_START_FETCHING,
  DUPLICATE_EVENTS_STOP_FETCHING,
  DUPLICATE_VENUES_START_FETCHING,
  DUPLICATE_VENUES_STOP_FETCHING,
  SECONDARY_MARKET_START_FETCHING,
  SECONDARY_MARKET_STOP_FETCHING,
  EVENT_BY_PROMO_NAME_START_FETCHING,
  EVENT_BY_PROMO_NAME_STOP_FETCHING,
  SLIP_ORDER_START_FETCHING,
  SLIP_ORDER_STOP_FETCHING,
  REMONITOR_PRESALE_EVENTS_START_FETCHING,
  REMONITOR_PRESALE_EVENTS_STOP_FETCHING,
  SHOWSONSALE_MATCHED_EVENTS_START_FETCHING,
  SHOWSONSALE_MATCHED_EVENTS_STOP_FETCHING
} from "../actions/app";

const initMsg = {
  type: "",
  message: ""
};

const app = (
  state = {
    fetching: false,
    eventFetching: false,
    blackListFetching: false,
    addBlackListFetching: false,
    resetPasswordFetching: false,
    isOrderFlowFetching: false,
    updateProfileFetching: false,
    eventQueueFetching: false,
    isUnmatchedEventFetching: false,
    isMisMatchEventFetching: false,
    eventAvailablePromosFetching: false,
    openOrderFetching: false,
    eventPromosFetching: false,
    priceFetching: false,
    secondaryFetching: false,
    errorMsg: initMsg,
    alertMsg: initMsg,
    webSocket: null,
    isDuplicateEventsFetching: false,
    isDuplicateVenuesFetching: false,
    isEventsByPromoFetching: false,
    isSlipOrderFetching: false,
    remonitorPresaleFetching: false,
    isShowsOnSaleMatchedEventFetching: false
  },
  action
) => {
  switch (action.type) {
    case APP_START_FETCHING:
      return { ...state, fetching: true };
    case APP_STOP_FETCHING:
      return { ...state, fetching: false };
    case EVENT_START_FETCHING:
      return { ...state, eventFetching: true };
    case EVENT_STOP_FETCHING:
      return { ...state, eventFetching: false };
    case PRICE_START_FETCHING:
      return { ...state, priceFetching: true };
    case PRICE_STOP_FETCHING:
      return { ...state, priceFetching: false };
    case SECONDARY_MARKET_START_FETCHING:
      return { ...state, secondaryFetching: true };
    case SECONDARY_MARKET_STOP_FETCHING:
      return { ...state, secondaryFetching: false };
    case BLACKLIST_START_FETCHING:
      return { ...state, blackListFetching: true };
    case BLACKLIST_STOP_FETCHING:
      return { ...state, blackListFetching: false };
    case ADDBLACKLIST_START_FETCHING:
      return { ...state, addBlackListFetching: true };
    case ADDBLACKLIST_STOP_FETCHING:
      return { ...state, addBlackListFetching: false };
    case EVENT_QUEUE_START_FETCHING:
      return { ...state, eventQueueFetching: true };
    case EVENT_QUEUE_STOP_FETCHING:
      return { ...state, eventQueueFetching: false };
    case UNMATCHED_EVENT_START_FETCHING:
      return { ...state, isUnmatchedEventFetching: true };
    case UNMATCHED_EVENT_STOP_FETCHING:
      return { ...state, isUnmatchedEventFetching: false };
    case MIS_MATCHED_EVENT_START_FETCHING:
      return { ...state, isMisMatchEventFetching: true };
    case MIS_MATCHED_EVENT_STOP_FETCHING:
      return { ...state, isMisMatchEventFetching: false };
    case RESETPASSWORD_START_FETCHING:
      return { ...state, resetPasswordFetching: true };
    case RESETPASSWORD_STOP_FETCHING:
      return { ...state, resetPasswordFetching: false };
    case ORDERFLOW_START_FETCHING:
      return { ...state, isOrderFlowFetching: true };
    case ORDERFLOW_STOP_FETCHING:
      return { ...state, isOrderFlowFetching: false };
    case OPEN_ORDER_START_FETCHING:
      return { ...state, openOrderFetching: true };
    case OPEN_ORDER_STOP_FETCHING:
      return { ...state, openOrderFetching: false };
    case UPDATE_PROFILE_START_FETCHING:
      return { ...state, updateProfileFetching: true };
    case UPDATE_PROFILE_STOP_FETCHING:
      return { ...state, updateProfileFetching: false };
    case EVENT_AVAILABLE_PROMO_START_FETCHING:
      return { ...state, eventAvailablePromosFetching: true };
    case EVENT_AVAILABLE_PROMO_STOP_FETCHING:
      return { ...state, eventAvailablePromosFetching: false };
    case EVENT_PROMO_START_FETCHING:
      return { ...state, eventPromosFetching: true };
    case EVENT_PROMO_STOP_FETCHING:
      return { ...state, eventPromosFetching: false };
    case DUPLICATE_EVENTS_START_FETCHING:
      return { ...state, isDuplicateEventsFetching: true };
    case DUPLICATE_EVENTS_STOP_FETCHING:
      return { ...state, isDuplicateEventsFetching: false };
    case DUPLICATE_VENUES_START_FETCHING:
      return { ...state, isDuplicateVenuesFetching: true };
    case DUPLICATE_VENUES_STOP_FETCHING:
      return { ...state, isDuplicateVenuesFetching: false };
    case EVENT_BY_PROMO_NAME_START_FETCHING:
      return { ...state, isEventsByPromoFetching: true };
    case EVENT_BY_PROMO_NAME_STOP_FETCHING:
      return { ...state, isEventsByPromoFetching: false };
    case SLIP_ORDER_START_FETCHING:
      return { ...state, isSlipOrderFetching: true };
    case SLIP_ORDER_STOP_FETCHING:
      return { ...state, isSlipOrderFetching: false };
    case REMONITOR_PRESALE_EVENTS_START_FETCHING:
      return { ...state, remonitorPresaleFetching: true };
    case REMONITOR_PRESALE_EVENTS_STOP_FETCHING:
      return { ...state, remonitorPresaleFetching: false };
    case SHOWSONSALE_MATCHED_EVENTS_START_FETCHING:
      return { ...state, isShowsOnSaleMatchedEventFetching: true };
    case SHOWSONSALE_MATCHED_EVENTS_STOP_FETCHING:
      return { ...state, isShowsOnSaleMatchedEventFetching: false };
    case APP_RECEIVE_ERROR:
      return {
        ...state,
        errorMsg: action.payload
      };
    case APP_CLEAR_ERROR:
      return { ...state, errorMsg: initMsg };
    case APP_RECEIVE_ALERT:
      return { ...state, alertMsg: action.payload };
    case APP_CLEAR_ALERT:
      return { ...state, alertMsg: initMsg };
    case INIT_WEB_SOCKET_SUCCESS:
      return { ...state, webSocket: action.payload };
    default:
      return state;
  }
};

export default app;

export const getIsFetching = state => state.fetching;
export const getIsEventFetching = state => state.eventFetching;
export const getIsBlackListFetching = state => state.blackListFetching;
export const getIsAddBlackListFetching = state => state.addBlackListFetching;
export const getIsResetPasswordFetching = state => state.resetPasswordFetching;
export const getIsOrderFlowFetching = state => state.isOrderFlowFetching;
export const getIsOpenOrderFetching = state => state.openOrderFetching;
export const getIsUpdateProfileFetching = state => state.updateProfileFetching;
export const getIsEventQueueFetching = state => state.eventQueueFetching;
export const getIsUnmatchedEventFetching = state =>
  state.isUnmatchedEventFetching;
export const getIsMisMatchEventFetching = state =>
  state.isMisMatchEventFetching;
export const getEventAvailablePromosFetching = state =>
  state.eventAvailablePromosFetching;
export const getEventPromosFetching = state => state.eventPromosFetching;

export const getIsPriceFetching = state => state.priceFetching;
export const getIsSecondaryMarketFetching = state => state.secondaryFetching;
export const getErrorMsg = state => state.errorMsg;
export const getAlertMsg = state => state.alertMsg;
export const getWebSocket = state => state.webSocket;

export const getIsDuplicateEventsFetching = state =>
  state.isDuplicateEventsFetching;
export const getIsDuplicateVenueFetching = state =>
  state.isDuplicateVenuesFetching;

export const getIsEventsByPromoFetching = state =>
  state.isEventsByPromoFetching;
export const getIsSlipOrderFetching = state => state.isSlipOrderFetching;
export const getIsRemonitorPresaleFetching = state =>
  state.remonitorPresaleFetching;

export const getIsShowsOnSaleMatchedEventFetching = state =>
  state.isShowsOnSaleMatchedEventFetching;

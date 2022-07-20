import { createAction } from "redux-actions";

export const APP_START_FETCHING = "APP_START_FETCHING";
export const APP_STOP_FETCHING = "APP_STOP_FETCHING";

export const APP_RECEIVE_ERROR = "APP_RECEIVE_ERROR";
export const APP_CLEAR_ERROR = "APP_CLEAR_ERROR";

export const APP_RECEIVE_ALERT = "APP_RECEIVE_ALERT";
export const APP_CLEAR_ALERT = "APP_CLEAR_ALERT";

export const EVENT_START_FETCHING = "EVENT_START_FETCHING";
export const EVENT_STOP_FETCHING = "EVENT_STOP_FETCHING";

export const PRICE_START_FETCHING = "PRICE_START_FETCHING";
export const PRICE_STOP_FETCHING = "PRICE_STOP_FETCHING";

export const BLACKLIST_START_FETCHING = "BLACKLIST_START_FETCHING";
export const BLACKLIST_STOP_FETCHING = "BLACKLIST_STOP_FETCHING";

export const ADDBLACKLIST_START_FETCHING = "ADDBLACKLIST_START_FETCHING";
export const ADDBLACKLIST_STOP_FETCHING = "ADDBLACKLIST_STOP_FETCHING";

export const EVENT_QUEUE_START_FETCHING = "EVENT_QUEUE_START_FETCHING";
export const EVENT_QUEUE_STOP_FETCHING = "EVENT_QUEUE_STOP_FETCHING";

export const UNMATCHED_EVENT_START_FETCHING = "UNMATCHED_EVENT_START_FETCHING";
export const UNMATCHED_EVENT_STOP_FETCHING = "UNMATCHED_EVENT_STOP_FETCHING";

export const MIS_MATCHED_EVENT_START_FETCHING =
  "MIS_MATCHED_EVENT_START_FETCHING";
export const MIS_MATCHED_EVENT_STOP_FETCHING =
  "MIS_MATCHED_EVENT_STOP_FETCHING";

export const ORDERFLOW_START_FETCHING = "ORDERFLOW_START_FETCHING";
export const ORDERFLOW_STOP_FETCHING = "ORDERFLOW_STOP_FETCHING";

export const OPEN_ORDER_START_FETCHING = "OPEN_ORDER_START_FETCHING";
export const OPEN_ORDER_STOP_FETCHING = "OPEN_ORDER_STOP_FETCHING";

export const RESETPASSWORD_START_FETCHING = "RESETPASSWORD_START_FETCHING";
export const RESETPASSWORD_STOP_FETCHING = "RESETPASSWORD_STOP_FETCHING";

export const UPDATE_PROFILE_START_FETCHING = "UPDATE_PROFILE_START_FETCHING";
export const UPDATE_PROFILE_STOP_FETCHING = "UPDATE_PROFILE_STOP_FETCHING";

export const EVENT_AVAILABLE_PROMO_START_FETCHING =
  "EVENT_AVAILABLE_PROMO_START_FETCHING";
export const EVENT_AVAILABLE_PROMO_STOP_FETCHING =
  "EVENT_AVAILABLE_PROMO_STOP_FETCHING";

export const EVENT_PROMO_START_FETCHING = "EVENT_PROMO_START_FETCHING";
export const EVENT_PROMO_STOP_FETCHING = "EVENT_PROMO_STOP_FETCHING";

export const DUPLICATE_EVENTS_START_FETCHING =
  "DUPLICATE_EVENTS_START_FETCHING";
export const DUPLICATE_EVENTS_STOP_FETCHING = "DUPLICATE_EVENTS_STOP_FETCHING";

export const DUPLICATE_VENUES_START_FETCHING =
  "DUPLICATE_VENUES_START_FETCHING";
export const DUPLICATE_VENUES_STOP_FETCHING = "DUPLICATE_VENUES_STOP_FETCHING";

export const SECONDARY_MARKET_START_FETCHING =
  "SECONDARY_MARKET_START_FETCHING";
export const SECONDARY_MARKET_STOP_FETCHING = "SECONDARY_MARKET_STOP_FETCHING";

export const EVENT_BY_PROMO_NAME_START_FETCHING =
  "EVENT_BY_PROMO_NAME_START_FETCHING";
export const EVENT_BY_PROMO_NAME_STOP_FETCHING =
  "EVENT_BY_PROMO_NAME_STOP_FETCHING";

export const SLIP_ORDER_START_FETCHING = "SLIP_ORDER_START_FETCHING";
export const SLIP_ORDER_STOP_FETCHING = "SLIP_ORDER_STOP_FETCHING";

export const REMONITOR_PRESALE_EVENTS_START_FETCHING =
  "REMONITOR_PRESALE_EVENTS_START_FETCHING";
export const REMONITOR_PRESALE_EVENTS_STOP_FETCHING =
  "REMONITOR_PRESALE_EVENTS_STOP_FETCHING";

export const SHOWSONSALE_MATCHED_EVENTS_START_FETCHING =
  "SHOWSONSALE_MATCHED_EVENTS_START_FETCHING";
export const SHOWSONSALE_MATCHED_EVENTS_STOP_FETCHING =
  "SHOWSONSALE_MATCHED_EVENTS_STOP_FETCHING";

export const appStartFetching = createAction(APP_START_FETCHING);
export const appStopFetching = createAction(APP_STOP_FETCHING);

export const eventStartFetching = createAction(EVENT_START_FETCHING);
export const eventStopFetching = createAction(EVENT_STOP_FETCHING);

export const priceStartFetching = createAction(PRICE_START_FETCHING);
export const priceStopFetching = createAction(PRICE_STOP_FETCHING);

export const blackListStartFetching = createAction(BLACKLIST_START_FETCHING);
export const blackListStopFetching = createAction(BLACKLIST_STOP_FETCHING);

export const addBlackListStartFetching = createAction(
  ADDBLACKLIST_START_FETCHING
);
export const addBlackListStopFetching = createAction(
  ADDBLACKLIST_STOP_FETCHING
);

export const resetPasswordStartFetching = createAction(
  RESETPASSWORD_START_FETCHING
);
export const resetPasswordStopFetching = createAction(
  RESETPASSWORD_STOP_FETCHING
);

export const orderFlowStartFetching = createAction(ORDERFLOW_START_FETCHING);
export const orderFlowStopFetching = createAction(ORDERFLOW_STOP_FETCHING);

export const slipOrderStartFetching = createAction(SLIP_ORDER_START_FETCHING);
export const slipOrderStopFetching = createAction(SLIP_ORDER_STOP_FETCHING);

export const openOrderStartFetching = createAction(OPEN_ORDER_START_FETCHING);
export const openOrderStopFetching = createAction(OPEN_ORDER_STOP_FETCHING);

export const updateProfileStartFetching = createAction(
  UPDATE_PROFILE_START_FETCHING
);
export const updateProfileStopFetching = createAction(
  UPDATE_PROFILE_STOP_FETCHING
);

export const eventQueueStartFetching = createAction(EVENT_QUEUE_START_FETCHING);
export const eventQueueStopFetching = createAction(EVENT_QUEUE_STOP_FETCHING);

export const eventAvailablePromoStartFetching = createAction(
  EVENT_AVAILABLE_PROMO_START_FETCHING
);
export const eventAvailablePromoStopFetching = createAction(
  EVENT_AVAILABLE_PROMO_STOP_FETCHING
);

export const secondaryMarketStartFetching = createAction(
  SECONDARY_MARKET_START_FETCHING
);
export const secondaryMarketStopFetching = createAction(
  SECONDARY_MARKET_STOP_FETCHING
);

// Promotion Page Fetch Events which has promo entered
export const eventPromoStartFetching = createAction(EVENT_PROMO_START_FETCHING);
export const eventPromoStopFetching = createAction(EVENT_PROMO_STOP_FETCHING);

export const unMatchedEventStartFetching = createAction(
  UNMATCHED_EVENT_START_FETCHING
);
export const unMatchedEventStopFetching = createAction(
  UNMATCHED_EVENT_STOP_FETCHING
);

export const misMatchedEventStartFetching = createAction(
  MIS_MATCHED_EVENT_START_FETCHING
);
export const misMatchedEventStopFetching = createAction(
  MIS_MATCHED_EVENT_STOP_FETCHING
);

export const appReceiveError = createAction(APP_RECEIVE_ERROR);
export const appClearError = createAction(APP_CLEAR_ERROR);

export const appReceiveAlert = createAction(APP_RECEIVE_ALERT);
export const appClearAlert = createAction(APP_CLEAR_ALERT);

//WebSocket
export const INIT_WEB_SOCKET_REQUEST = "INIT_WEB_SOCKET_REQUEST";
export const initWebSocketRequest = createAction(INIT_WEB_SOCKET_REQUEST);
export const INIT_WEB_SOCKET_SUCCESS = "INIT_WEB_SOCKET_SUCCESS";
export const initWebSocketSuccess = createAction(INIT_WEB_SOCKET_SUCCESS);

//Firebase
export const INIT_FIREBASE_REQUEST = "INIT_FIREBASE_REQUEST";
export const initFirebaseRequest = createAction(INIT_FIREBASE_REQUEST);
export const CLOSE_FIREBASE = "CLOSE_FIREBASE";
export const closeFirebase = createAction(CLOSE_FIREBASE);

export const OPEN_WEB_SOCKET = "OPEN_WEB_SOCKET";
export const openWebSocket = createAction(OPEN_WEB_SOCKET);

export const CLOSE_WEB_SOCKET = "CLOSE_WEB_SOCKET";
export const closeWebSocket = createAction(CLOSE_WEB_SOCKET);

export const RECEIVE_MESSAGE_FROM_WEB_SOCKET =
  "RECEIVE_MESSAGE_FROM_WEB_SOCKET";
export const receiveMessageFromWebSocket = createAction(
  RECEIVE_MESSAGE_FROM_WEB_SOCKET
);

// Duplicate Events
export const duplicateEventStartFetching = createAction(
  DUPLICATE_EVENTS_START_FETCHING
);
export const duplicateEventStopFetching = createAction(
  DUPLICATE_EVENTS_STOP_FETCHING
);

export const duplicateVenuesStartFetching = createAction(
  DUPLICATE_VENUES_START_FETCHING
);
export const duplicateVenuesStopFetching = createAction(
  DUPLICATE_VENUES_STOP_FETCHING
);

//events by promo name
export const eventByPrmomoNameStartFetching = createAction(
  EVENT_BY_PROMO_NAME_START_FETCHING
);
export const eventByPrmomoNameStopFetching = createAction(
  EVENT_BY_PROMO_NAME_STOP_FETCHING
);

//remonitor presale events
export const remonitorPresaleEventsStartFetching = createAction(
  REMONITOR_PRESALE_EVENTS_START_FETCHING
);
export const remonitorPresaleEventsStopFetching = createAction(
  REMONITOR_PRESALE_EVENTS_STOP_FETCHING
);

//ShowsOnsale matched event fetching
export const showsOnSaleMatchedEventStartFetching = createAction(
  SHOWSONSALE_MATCHED_EVENTS_START_FETCHING
);
export const showsOnSaleMatchedEventStopFetching = createAction(
  SHOWSONSALE_MATCHED_EVENTS_STOP_FETCHING
);

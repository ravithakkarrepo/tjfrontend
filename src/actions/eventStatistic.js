import { createAction } from "redux-actions";

// for Order Status Listing
export const FETCH_EVENT_STATISTIC_REQUEST = "FETCH_EVENT_STATISTIC_REQUEST";
export const fetchEventStatisticRequest = createAction(
  FETCH_EVENT_STATISTIC_REQUEST
);

export const FETCH_EVENT_STATISTIC_SUCCESS = "FETCH_EVENT_STATISTIC_SUCCESS";
export const fetchEventStatisticSuccess = createAction(
  FETCH_EVENT_STATISTIC_SUCCESS
);

//For Event Queue
export const FETCH_EVENT_MONITOR_REQUEST = "FETCH_EVENT_MONITOR_REQUEST";
export const FETCH_EVENT_MONITOR_SUCCESS = "FETCH_EVENT_MONITOR_SUCCESS";

export const fetchEventMonitorRequest = createAction(
  FETCH_EVENT_MONITOR_REQUEST
);

export const fetchEventMonitorSuccess = createAction(
  FETCH_EVENT_MONITOR_SUCCESS
);

export const FETCH_EVENT_REMONITOR_PRESALE_REQUEST =
  "FETCH_EVENT_REMONITOR_PRESALE_REQUEST";
export const FETCH_EVENT_REMONITOR_PRESALE_SUCCESS =
  "FETCH_EVENT_REMONITOR_PRESALE_SUCCESS";

export const fetchEventReMonitorPresaleRequest = createAction(
  FETCH_EVENT_REMONITOR_PRESALE_REQUEST
);

export const fetchEventReMonitorPresaleSuccess = createAction(
  FETCH_EVENT_REMONITOR_PRESALE_SUCCESS
);

export const UPDATE_ISMONITOR_SUCCESS = "UPDATE_ISMONITOR_SUCCESS";

export const updateIsMonitorSuccess = createAction(UPDATE_ISMONITOR_SUCCESS);

export const UPDATE_ISBLACKLIST_SUCCESS = "UPDATE_ISBLACKLIST_SUCCESS";

export const updateIsBlackListSuccess = createAction(
  UPDATE_ISBLACKLIST_SUCCESS
);

export const ADD_EVENT_PROMO__SUCCESS = "ADD_EVENT_PROMO__SUCCESS";

export const addEventPromoSuccess = createAction(ADD_EVENT_PROMO__SUCCESS);

export const FETCH_UNMATCHEDEVENT_QUEUE_REQUEST =
  "FETCH_UNMATCHEDEVENT_QUEUE_REQUEST";
export const FETCH_UNMATCHEDEVENT_QUEUE_SUCCESS =
  "FETCH_UNMATCHEDEVENT_QUEUE_SUCCESS";

export const fetchUnmatchedEventQueueRequest = createAction(
  FETCH_UNMATCHEDEVENT_QUEUE_REQUEST
);

export const fetchUnmatchedEventQueueSuccess = createAction(
  FETCH_UNMATCHEDEVENT_QUEUE_SUCCESS
);

export const FETCH_MIS_MATCHED_EVENT_QUEUE_REQUEST =
  "FETCH_MIS_MATCHED_EVENT_QUEUE_REQUEST";
export const FETCH_MIS_MATCHED_EVENT_QUEUE_SUCCESS =
  "FETCH_MIS_MATCHED_EVENT_QUEUE_SUCCESS";

export const fetchMisMatchedEventQueueRequest = createAction(
  FETCH_MIS_MATCHED_EVENT_QUEUE_REQUEST
);

export const fetchMisMatchedEventQueueSuccess = createAction(
  FETCH_MIS_MATCHED_EVENT_QUEUE_SUCCESS
);

//fetch unmanaged/missing events
export const FETCH_SHOWONSALE_EVENT_REQUEST = "FETCH_SHOWONSALE_EVENT_REQUEST";
export const FETCH_SHOWONSALE_EVENT_SUCCESS = "FETCH_SHOWONSALE_EVENT_SUCCESS";

export const fetchShowOnSaleRequest = createAction(
  FETCH_SHOWONSALE_EVENT_REQUEST
);

export const fetchShowOnSaleSuccess = createAction(
  FETCH_SHOWONSALE_EVENT_SUCCESS
);

export const UPDATE_MISMATCH_FROM_EVENT_QUEUE_REQUEST =
  "UPDATE_MISMATCH_FROM_EVENT_QUEUE_REQUEST";
export const updateByMismatchFromEventQueueRequest = createAction(
  UPDATE_MISMATCH_FROM_EVENT_QUEUE_REQUEST
);
export const UPDATE_MISMATCH_FROM_EVENT_QUEUE_SUCCESS =
  "UPDATE_MISMATCH_FROM_EVENT_QUEUE_SUCCESS";
export const updateByMismatchFromEventQueueSuccess = createAction(
  UPDATE_MISMATCH_FROM_EVENT_QUEUE_SUCCESS
);

export const UPDATE_BY_SKYBOX_EVENT_FROM_EVENT_QUEUE_SUCCESS =
  "UPDATE_BY_SKYBOX_EVENT_FROM_EVENT_QUEUE_SUCCESS";
export const updateBySkyboxEventIdFromEventQueueSuccess = createAction(
  UPDATE_BY_SKYBOX_EVENT_FROM_EVENT_QUEUE_SUCCESS
);

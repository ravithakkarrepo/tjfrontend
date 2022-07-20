import { createAction } from "redux-actions";

export const FETCH_EVENTS_LOG_REQUEST = "FETCH_EVENTS_LOG_REQUEST";
export const fetchEventsLogRequest = createAction(FETCH_EVENTS_LOG_REQUEST);

export const FETCH_EVENTS_LOG_SUCCESS = "FETCH_EVENTS_LOG_SUCCESS";
export const fetchEventsLogSuccess = createAction(FETCH_EVENTS_LOG_SUCCESS);

export const FETCH_LOG_DETAILS_REQUEST = "FETCH_LOG_DETAILS_REQUEST";
export const fetchEventsLogDetailsRequest = createAction(
  FETCH_LOG_DETAILS_REQUEST
);

export const FETCH_LOG_DETAILS_SUCCESS = "FETCH_LOG_DETAILS_SUCCESS";
export const fetchEventsLogDetailsSuccess = createAction(
  FETCH_LOG_DETAILS_SUCCESS
);

export const FETCH_MEDIUM_TERM_LOG_REQUEST = "FETCH_MEDIUM_TERM_LOG_REQUEST";
export const fetchMediumTermEventsLogRequest = createAction(
  FETCH_MEDIUM_TERM_LOG_REQUEST
);

export const FETCH_MEDIUM_TERM_LOG_SUCCESS = "FETCH_MEDIUM_TERM_LOG_SUCCESS";
export const fetchMediumTermEventsLogSuccess = createAction(
  FETCH_MEDIUM_TERM_LOG_SUCCESS
);

export const FETCH_LONG_TERM_LOG_REQUEST = "FETCH_LONG_TERM_LOG_REQUEST";
export const fetchLongTermEventsLogRequest = createAction(
  FETCH_LONG_TERM_LOG_REQUEST
);

export const FETCH_LONG_TERM_LOG_SUCCESS = "FETCH_LONG_TERM_LOG_SUCCESS";
export const fetchLongTermEventsLogSuccess = createAction(
  FETCH_LONG_TERM_LOG_SUCCESS
);

export const FETCH_VIEW_LOG_SUCCESS = "FETCH_VEIW_LOG_SUCCESS";
export const fetchViewLogSuccess = createAction(FETCH_VIEW_LOG_SUCCESS);

export const FETCH_VIEW_LOG_REQUEST = "FETCH_VIEW_LOG_REQUEST";
export const fetchViewLogRequest = createAction(FETCH_VIEW_LOG_REQUEST);

// For downLoading Log of intanceId
export const FETCH_INSTANCE_LOG_REQUEST = "FETCH_INSTANCE_LOG_REQUEST";
export const fetchInstanceLogRequest = createAction(FETCH_INSTANCE_LOG_REQUEST);

export const FETCH_INSTANCE_LOG_SUCCESS = "FETCH_INSTANCE_LOG_SUCCESS";
export const fetchInstanceLogSuccess = createAction(FETCH_INSTANCE_LOG_SUCCESS);

// For downLoading Log of intanceId for Failed
export const FETCH_FAILED_EVENT_LOG_REQUEST = "FETCH_FAILED_EVENT_LOG_REQUEST";
export const fetchFailedEventLogRequest = createAction(
  FETCH_FAILED_EVENT_LOG_REQUEST
);

export const FETCH_FAILED_EVENT_LOG_SUCCESS = "FETCH_FAILED_EVENT_LOG_SUCCESS";
export const fetchFailedEventLogSuccess = createAction(
  FETCH_FAILED_EVENT_LOG_SUCCESS
);

export const FETCH_EVENT_LOG_INFO_REQUEST = "FETCH_EVENT_LOG_INFO_REQUEST";
export const fetchEventsLogInfoRequest = createAction(
  FETCH_EVENT_LOG_INFO_REQUEST
);

export const FETCH_EVENT_LOG_INFO_SUCCESS = "FETCH_EVENT_LOG_INFO_SUCCESS";
export const fetchEventsLogInfoSuccess = createAction(
  FETCH_EVENT_LOG_INFO_SUCCESS
);

//TriggerAlertForEvents
export const CREATE_TRIGGER_ALERT_FOR_EVENTS_REQUEST =
  "CREATE_TRIGGER_ALERT_FOR_EVENTS_REQUEST";

export const createTriggerAlertForEventsRequest = createAction(
  CREATE_TRIGGER_ALERT_FOR_EVENTS_REQUEST
);

export const FETCH_TRIGGER_ALERT_FOR_EVENTS_REQUEST =
  "FETCH_TRIGGER_ALERT_FOR_EVENTS_REQUEST";

export const fetchTriggerAlertForEventsRequest = createAction(
  FETCH_TRIGGER_ALERT_FOR_EVENTS_REQUEST
);

export const FETCH_TRIGGER_ALERT_FOR_EVENTS_SUCCESS =
  "FETCH_TRIGGER_ALERT_FOR_EVENTS_SUCCESS";

export const fetchTriggerAlertForEventsSuccess = createAction(
  FETCH_TRIGGER_ALERT_FOR_EVENTS_SUCCESS
);
export const FETCH_ALERT_INFO_SUCCESS = "FETCH_ALERT_INFO_SUCCESS";

export const fetchAllAlertInfosSuccess = createAction(FETCH_ALERT_INFO_SUCCESS);

export const FETCH_ALERT_INFO_REQUEST = "FETCH_ALERT_INFO_REQUEST";

export const fetchAllAlertInfosRequest = createAction(FETCH_ALERT_INFO_REQUEST);

export const FETCH_ALERT_INFO_STOP_FETCHING = "FETCH_ALERT_INFO_STOP_FETCHING";

export const alertInfosStopFetching = createAction(
  FETCH_ALERT_INFO_STOP_FETCHING
);

export const UPDATE_ALERT_INFO_REQUEST = "UPDATE_ALERT_INFO_REQUEST";

export const updateAlertInfoRequest = createAction(UPDATE_ALERT_INFO_REQUEST);

export const DELETE_ALERT_INFO_REQUEST = "DELETE_ALERT_INFO_REQUEST";

export const deleteAlertInfoRequest = createAction(DELETE_ALERT_INFO_REQUEST);

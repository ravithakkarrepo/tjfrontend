import { connect } from "react-redux";

import Alert from "./Alert";
import { getIsFetching } from "../../reducers";
import {
  getAlertTriggerInfo,
  getAllAlertInfoTypes,
  getIsAlertInfoFetching
} from "../../reducers/logs";
import {
  createTriggerAlertForEventsRequest,
  fetchTriggerAlertForEventsRequest,
  fetchAllAlertInfosRequest,
  updateAlertInfoRequest,
  deleteAlertInfoRequest
} from "../../actions/logs";
import { saveSelectEvent, saveSelectedEventFrom } from "../../actions/tickets";

const AlertContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    alertTriggerInfo: getAlertTriggerInfo(state.logs),
    alertInfoTypes: getAllAlertInfoTypes(state.logs),
    isAlertInfoFetching: getIsAlertInfoFetching(state.logs)
  }),
  {
    createTriggerAlertForEventsRequest,
    fetchTriggerAlertForEventsRequest,
    fetchAllAlertInfosRequest,
    updateAlertInfoRequest,
    deleteAlertInfoRequest,
    saveSelectEvent,
    saveSelectedEventFrom
  }
)(Alert);

export default AlertContainer;

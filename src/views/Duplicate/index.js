import { connect } from "react-redux";

import {
  getIsFetching,
  getIsDuplicateEventsFetching,
  getDuplicateEventsQueue,
  getDuplicateVenuesQueue,
  getIsDuplicateVenuesFetching,
  getIsMisMatchEventFetching,
  getMisMatchedEventQueue
} from "../../reducers";

import DuplicateEventsQueue from "./DuplicateQueue";

import {
  createManagedQueueEventsRequest,
  fetchDuplicateEventsRequest,
  deleteDuplicateEventsRequest,
  updateEventBySkyboxEventIdRequest,
  archiveEventsRequest
} from "../../actions/events";

import { fetchMisMatchedEventQueueRequest } from "../../actions/eventStatistic";
import {
  fetchDuplicateVenueSearchRequest,
  deleteDuplicateVenueRequest,
  updateDuplicateVenueIsBlackListRequest,
  updateVenueBySkyboxVenueIdRequest
} from "../../actions/venues";

import { appReceiveAlert } from "../../actions/app";

const DuplicateEventsContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    isDuplicateEventsFetching: getIsDuplicateEventsFetching(state),
    duplicateEventsQueue: getDuplicateEventsQueue(state),
    isDuplicateVenueFetching: getIsDuplicateVenuesFetching(state),
    duplicateVenuesQueue: getDuplicateVenuesQueue(state),
    isMisMatchEventFetching: getIsMisMatchEventFetching(state),
    misMatchedEventsQueue: getMisMatchedEventQueue(state)
  }),
  {
    fetchDuplicateEventsRequest,
    fetchDuplicateVenueSearchRequest,
    deleteDuplicateEventsRequest,
    deleteDuplicateVenueRequest,
    updateDuplicateVenueIsBlackListRequest,
    fetchMisMatchedEventQueueRequest,
    createManagedQueueEventsRequest,
    updateEventBySkyboxEventIdRequest,
    updateVenueBySkyboxVenueIdRequest,
    appReceiveAlert,
    archiveEventsRequest
  }
)(DuplicateEventsQueue);

export default DuplicateEventsContainer;

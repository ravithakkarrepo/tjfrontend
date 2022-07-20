import { connect } from "react-redux";

import {
  updateIsBlackListRequest,
  FetchBlackListPriceSectionRequest,
  updateIsMonitorRequest,
  addBlackListPriceSectionRequest,
  updateEventBySkyboxEventIdRequest,
  archiveEventsRequest
} from "../../actions/events";
import {
  getIsFetching,
  getIsEventQueueFetching,
  getIsUnmatchedEventFetching,
  getEventAvailablePromosFetching,
  getIsBlackListFetching,
  getIsAddBlackListFetching,
  getEventMonitor,
  getBlacListInfo,
  getEventPromos,
  getUnmatchedEventQueue,
  getIsEventFetching,
  getShowOnSaleEvents,
  getEventAvailablePromoNames,
  getMisMatchedEventQueue,
  getIsMisMatchEventFetching,
  getIsRemonitorPresaleFetching,
  getIsShowsOnSaleMatchedEventFetching
} from "../../reducers";

import {
  fetchEventMonitorRequest,
  fetchUnmatchedEventQueueRequest,
  fetchShowOnSaleRequest,
  fetchMisMatchedEventQueueRequest,
  updateByMismatchFromEventQueueRequest,
  fetchEventReMonitorPresaleRequest
} from "../../actions/eventStatistic";

import EventQueue from "./EventQueue";

import {
  deleteEventPromosFromAddPromoRequest,
  addEventPromoRequest,
  fetchEventPromosRequest,
  fetchEventAvailablePromoRequest,
  clearAvailablePromoNames
} from "../../actions/promos";

import { getManagedSkyBoxEventsDup, getNoSkyboxEvents } from "../../reducers";

import {
  createManagedQueueEventsRequest,
  selectModalSkyboxEvents,
  clearSearchEvents,
  closeModalSkyBoxEventsNotFounded
} from "../../actions/events";
import { saveSelectEvent, clearSelectEvent } from "../../actions/tickets";
import { appReceiveAlert } from "../../actions/app";

const EventQueueContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    isEventQueueFetching: getIsEventQueueFetching(state),
    isUnmatchedEventFetching: getIsUnmatchedEventFetching(state),
    eventAvailablePromosFetching: getEventAvailablePromosFetching(state),
    isEventFetching: getIsEventFetching(state),
    isBlackListingFetching: getIsBlackListFetching(state),
    eventMonitor: getEventMonitor(state),
    blackListInfo: getBlacListInfo(state),
    isAddBlackListFetching: getIsAddBlackListFetching(state),
    eventPromos: getEventPromos(state),
    unmatchedEventsQueue: getUnmatchedEventQueue(state),
    skyBoxEventsDup: getManagedSkyBoxEventsDup(state),
    noSkyboxEvents: getNoSkyboxEvents(state),
    showsOnSaleEvents: getShowOnSaleEvents(state),
    availablePromoNames: getEventAvailablePromoNames(state),
    misMatchedEventsQueue: getMisMatchedEventQueue(state),
    isMisMatchEventFetching: getIsMisMatchEventFetching(state),
    isRemonitorPresaleFetching: getIsRemonitorPresaleFetching(state),
    isShowsOnSaleMatchedEventFetching: getIsShowsOnSaleMatchedEventFetching(
      state
    )
  }),
  {
    updateIsBlackListRequest,
    FetchBlackListPriceSectionRequest,
    updateIsMonitorRequest,
    addBlackListPriceSectionRequest,
    fetchEventMonitorRequest,
    deleteEventPromosFromAddPromoRequest,
    addEventPromoRequest,
    fetchEventPromosRequest,
    appReceiveAlert,
    fetchUnmatchedEventQueueRequest,
    saveSelectEvent,
    clearSelectEvent,
    createManagedQueueEventsRequest,
    selectModalSkyboxEvents,
    clearSearchEvents,
    closeModalSkyBoxEventsNotFounded,
    fetchShowOnSaleRequest,
    fetchEventAvailablePromoRequest,
    clearAvailablePromoNames,
    fetchMisMatchedEventQueueRequest,
    updateByMismatchFromEventQueueRequest,
    updateEventBySkyboxEventIdRequest,
    fetchEventReMonitorPresaleRequest,
    archiveEventsRequest
  }
)(EventQueue);

export default EventQueueContainer;

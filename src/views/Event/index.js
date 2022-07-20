import { connect } from "react-redux";

import {
  getTicketsSummary,
  getTickets,
  getTicketsGroups,
  getSelectedTicket,
  getValidListings,
  getTrackedListings,
  getSoldListings,
  getPctVenueAvail,
  getIsFetching,
  getEventDetailsLog,
  getIsEventFetching,
  getPricePointList,
  getSecondaryMargetList,
  getRePriceEventLog,
  getManagedEventById,
  getIsPriceFetching,
  getIsBlackListFetching,
  getIsAddBlackListFetching,
  getBlacListInfo,
  getSelectedEventFrom,
  getIsSecondaryMarketFetching
} from "../../reducers";
import {
  fetchTicketsByEventIdClear,
  clearSelectEvent
} from "../../actions/tickets";
import {
  publishListingRequest,
  fetchValidListingsRequest,
  fetchValidListingsWithSpreadRequest,
  cancelAllListingRequest,
  cancelListingByPrice
} from "../../actions/listings";
import {
  fetchEventInfoByEventIdRequest,
  cancelFetchEventInfoByEventIdRequest,
  fetchEventDetailsLogRequest,
  fetchRePriceEventLogRequest,
  fetchPricePointRequest,
  fetchSecodaryLogsRequest,
  updatePriceMarkUpPctRequest,
  fetchEventByEventIdRequest,
  updateManagedEventsRequest,
  updateIsBlackListRequest,
  addBlackListPriceSectionRequest,
  FetchBlackListPriceSectionRequest
} from "../../actions/events";
import { broadcastListingRequest } from "../../actions/config";
import Event from "./Event";
import { appReceiveAlert } from "../../actions/app";

const EventContainer = connect(
  state => ({
    summary: getTicketsSummary(state),
    groups: getTicketsGroups(state),
    pctVenueAvail: getPctVenueAvail(state),
    tickets: getTickets(state),
    selectedEvent: getSelectedTicket(state),
    selectedEventFrom: getSelectedEventFrom(state),
    validListings: getValidListings(state),
    trackedListings: getTrackedListings(state),
    soldListings: getSoldListings(state),
    isFetching: getIsFetching(state),
    isEventFetching: getIsEventFetching(state),
    eventDetailsLog: getEventDetailsLog(state),
    rePriceEventLog: getRePriceEventLog(state),
    pricePointList: getPricePointList(state),
    secondaryMargetList: getSecondaryMargetList(state),
    eventInfoById: getManagedEventById(state),
    priceFetching: getIsPriceFetching(state),
    secondaryFetching: getIsSecondaryMarketFetching(state),
    isBlackListingFetching: getIsBlackListFetching(state),
    isAddBlackListFetching: getIsAddBlackListFetching(state),
    blackListInfo: getBlacListInfo(state)
  }),
  {
    fetchEventInfoByEventIdRequest,
    cancelFetchEventInfoByEventIdRequest,
    fetchValidListingsRequest,
    fetchValidListingsWithSpreadRequest,
    fetchTicketsByEventIdClear,
    clearSelectEvent,
    publishListingRequest,
    cancelAllListingRequest,
    cancelListingByPrice,
    fetchEventDetailsLogRequest,
    fetchRePriceEventLogRequest,
    fetchPricePointRequest,
    fetchSecodaryLogsRequest,
    updatePriceMarkUpPctRequest,
    appReceiveAlert,
    fetchEventByEventIdRequest,
    updateManagedEventsRequest,
    broadcastListingRequest,
    updateIsBlackListRequest,
    addBlackListPriceSectionRequest,
    FetchBlackListPriceSectionRequest
  }
)(Event);

export default EventContainer;

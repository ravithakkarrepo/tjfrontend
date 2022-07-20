import { connect } from "react-redux";

import ManagedEvents from "./ManagedEvents";
import {
  fetchManagedEventsRequest,
  fetchManagedEventsByKeywordRequest,
  fetchManagedEventsFilterRequest,
  fetchManagedEventsSearchRequest,
  updateManagedEventsRequest,
  deleteManagedEventsRequest,
  userOverrideAvaiRequest,
  clearManagedEvents,
  updateIsBlackListRequest,
  fetchEventInfoByEventIdRequest,
  FetchBlackListPriceSectionRequest,
  addBlackListPriceSectionRequest,
  fetchAvailableOfferRequest,
  updatePriceMarkUpPctRequest,
  updateEventBySkyboxEventIdRequest,
  bulkUpdatePriceMarkUpPctRequest,
  fetchEventsPerformersRequest
} from "../../actions/events";

import { fetchValidListingsRequest } from "../../actions/listings";

import { saveSelectEvent, saveSelectedEventFrom } from "../../actions/tickets";
import {
  getManagedEvents,
  getIsFetching,
  getTicketsGroups,
  getIsBlackListFetching,
  getIsAddBlackListFetching,
  getValidListings,
  getTrackedListings,
  getBlacListInfo,
  getAvailableOffers,
  getEventAvailablePromoNames,
  getEventsPerformers
} from "../../reducers";
import { broadcastListingRequest } from "../../actions/config";
import {
  deleteEventPromosFromAddPromoRequest,
  addEventPromoRequest,
  fetchEventPromosRequest,
  fetchEventAvailablePromoRequest,
  clearAvailablePromoNames
} from "../../actions/promos";
import { appReceiveAlert } from "../../actions/app";

const ManagedEventsContainer = connect(
  state => ({
    managedEvents: getManagedEvents(state),
    isFetching: getIsFetching(state),
    isBlackListingFetching: getIsBlackListFetching(state),
    isAddBlackListFetching: getIsAddBlackListFetching(state),
    validListings: getValidListings(state),
    trackedListings: getTrackedListings(state),
    groups: getTicketsGroups(state),
    blackListInfo: getBlacListInfo(state),
    availableOffers: getAvailableOffers(state),
    eventsPerformers: getEventsPerformers(state),
    availablePromoNames: getEventAvailablePromoNames(state)
  }),
  {
    saveSelectEvent,
    saveSelectedEventFrom,
    fetchManagedEventsRequest,
    updateManagedEventsRequest,
    deleteManagedEventsRequest,
    fetchManagedEventsByKeywordRequest,
    fetchManagedEventsFilterRequest,
    fetchManagedEventsSearchRequest,
    broadcastListingRequest,
    userOverrideAvaiRequest,
    clearManagedEvents,
    updateIsBlackListRequest,
    fetchEventInfoByEventIdRequest,
    FetchBlackListPriceSectionRequest,
    fetchValidListingsRequest,
    addBlackListPriceSectionRequest,
    fetchAvailableOfferRequest,
    updatePriceMarkUpPctRequest,
    deleteEventPromosFromAddPromoRequest,
    addEventPromoRequest,
    fetchEventPromosRequest,
    appReceiveAlert,
    fetchEventAvailablePromoRequest,
    clearAvailablePromoNames,
    updateEventBySkyboxEventIdRequest,
    bulkUpdatePriceMarkUpPctRequest,
    fetchEventsPerformersRequest
  }
)(ManagedEvents);

export default ManagedEventsContainer;

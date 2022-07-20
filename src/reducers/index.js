import { combineReducers } from "redux";

import user, * as fromUser from "./user";
import app, * as fromApp from "./app";
import events, * as fromEvents from "./events";
import tickets, * as fromTickets from "./tickets";
import venues, * as fromVenues from "./venues";
import config, * as fromConfig from "./config";
import listings, * as fromListings from "./listings";
import promos, * as fromPromos from "./promos";
import globals, * as fromGlobal from "./globals";
import logs, * as fromLogs from "./logs";
import orders, * as fromOrders from "./orderStatus";
import eVenues, * as fromEVenues from "./eVenue";
import emailManagement, * as fromEmailManagement from "./emailManagement";
import eventStatistic, * as fromEventStatistic from "./eventStatistic";
import clockTimers, * as fromClockTimer from "./clockTimer";
import axsVenues, * as fromAxsVenues from "./axsVenues";
import otherVenues, * as fromOtherVenues from "./otherVenues";
import healthReport, * as fromHealthReport from "./healthReport";
const rootReducer = combineReducers({
  app,
  config,
  user,
  events,
  tickets,
  venues,
  listings,
  promos,
  globals,
  logs,
  orders,
  eVenues,
  emailManagement,
  eventStatistic,
  clockTimers,
  axsVenues,
  otherVenues,
  healthReport
});

export default rootReducer;

//app
export const getIsBlackListFetching = state =>
  fromApp.getIsBlackListFetching(state.app);
export const getIsAddBlackListFetching = state =>
  fromApp.getIsAddBlackListFetching(state.app);
export const getIsEventFetching = state =>
  fromApp.getIsEventFetching(state.app);
export const getIsFetching = state => fromApp.getIsFetching(state.app);
export const getIsOpenOrderFetching = state =>
  fromApp.getIsOpenOrderFetching(state.app);

//Event Queue Page Fetching
export const getIsEventQueueFetching = state =>
  fromApp.getIsEventQueueFetching(state.app);
export const getIsUnmatchedEventFetching = state =>
  fromApp.getIsUnmatchedEventFetching(state.app);

export const getIsMisMatchEventFetching = state =>
  fromApp.getIsMisMatchEventFetching(state.app);

export const getEventAvailablePromosFetching = state =>
  fromApp.getEventAvailablePromosFetching(state.app);
export const getEventPromosFetching = state =>
  fromApp.getEventPromosFetching(state.app);

export const getErrorMsg = state => fromApp.getErrorMsg(state.app);
export const getAlertMsg = state => fromApp.getAlertMsg(state.app);
export const getWebSocket = state => fromApp.getWebSocket(state.app);
export const getIsResetPasswordFetching = state =>
  fromApp.getIsResetPasswordFetching(state.app);

export const getIsOrderFlowFetching = state =>
  fromApp.getIsOrderFlowFetching(state.app);

export const getIsSlipOrderFetching = state =>
  fromApp.getIsSlipOrderFetching(state.app);

export const getIsUpdateProfileFetching = state =>
  fromApp.getIsUpdateProfileFetching(state.app);

export const getIsPriceFetching = state =>
  fromApp.getIsPriceFetching(state.app);
export const getIsSecondaryMarketFetching = state =>
  fromApp.getIsSecondaryMarketFetching(state.app);

export const getIsEventsByPromoFetching = state =>
  fromApp.getIsEventsByPromoFetching(state.app);

export const getIsBroadcasting = state =>
  fromConfig.getIsBroadcasting(state.config);

export const getHasLoggedIn = state => fromUser.getHasLoggedIn(state.user);
export const getUserInfo = state => fromUser.getUserInfo(state.user);
export const getUserProfileInfo = state =>
  fromUser.getUserProfileInfo(state.user);
export const getAccessToken = state => fromUser.getAccessToken(state.user);

export const getAllJockeyAccounts = state =>
  fromUser.getAllJockeyAccounts(state.user);

export const getSearchEvents = state =>
  fromEvents.getSearchEvents(state.events);
export const getSkyBoxVenueId = state =>
  fromEvents.getSkyBoxVenueId(state.events);
export const getTMasterVenueId = state =>
  fromEvents.getTMasterVenueId(state.events);
export const getSearchEventsTotalNum = state =>
  fromEvents.getSearchEventsTotalNum(state.events);
export const getSearchEventsFilters = state =>
  fromEvents.getSearchEventsFilters(state.events);
export const getSearchEventsByFilters = state =>
  fromEvents.getSearchEventsByFilters(state.events);
export const getManagedEvents = state =>
  fromEvents.getManagedEvents(state.events);
export const getManagedEventById = state =>
  fromEvents.getManagedEventById(state.events);
export const getManagedEventsQueue = state =>
  fromEvents.getManagedEventsQueue(state.events);
export const getManagedSkyBoxEventsDup = state =>
  fromEvents.getManagedSkyBoxEventsDup(state.events);
export const getNoSkyboxEvents = state =>
  fromEvents.getNoSkyboxEvents(state.events);

export const getManagedVenues = state =>
  fromVenues.getManagedVenues(state.venues);

export const getSearchVenueData = state =>
  fromVenues.getSearchVenueData(state.venues);

export const getSkyBoxVenuesDup = state =>
  fromVenues.getSkyBoxVenuesDup(state.venues);

export const getisCalledFromCreateVenue = state =>
  fromVenues.getisCalledFromCreateVenue(state.venues);

export const getSearchManagedVenue = state =>
  fromVenues.getSearchManagedVenue(state.venues);
export const getSearchVenueInSkyBox = state =>
  fromVenues.getSearchVenueInSkyBox(state.venues);
export const getTicketsSummary = state =>
  fromTickets.getTicketsSummary(state.tickets);
export const getTicketsGroups = state =>
  fromTickets.getTicketsGroups(state.tickets);
export const getPctVenueAvail = state =>
  fromTickets.getPctVenueAvail(state.tickets);
export const getTickets = state => fromTickets.getTickets(state.tickets);
export const getSelectedTicket = state =>
  fromTickets.getSelectedTicket(state.tickets);
export const getSelectedEventFrom = state =>
  fromTickets.getSelectedEventFrom(state.tickets);
export const getValidListings = state =>
  fromTickets.getValidListings(state.tickets);
export const getTrackedListings = state =>
  fromTickets.getTrackedListings(state.tickets);
export const getSoldListings = state =>
  fromTickets.getSoldListings(state.tickets);

export const getSlipOrders = state =>
  fromListings.getSlipOrders(state.listings);

export const getUpComingOrder = state =>
  fromListings.getUpComingOrder(state.listings);

export const getOpenSalesListings = state =>
  fromListings.getOpenSalesListings(state.listings);

export const getOpenTransfersListings = state =>
  fromListings.getOpenTransfersListings(state.listings);
export const getUpcomingOpenOrders = state =>
  fromListings.getUpcomingOpenOrders(state.listings);
export const getPurchasedTicketInfo = state =>
  fromListings.getPurchasedTicketInfo(state.listings);

export const getSimulateTrackedListing = state =>
  fromListings.getSimulateTrackedListing(state.listings);

export const getOrderFlowListings = state =>
  fromListings.getOrderFlowListings(state.listings);

export const getPDFAttachment = state =>
  fromListings.getPDFAttachment(state.listings);

export const getBroadCastUnbroadCastData = state =>
  fromListings.getBroadCastUnbroadCastData(state.listings);

export const getEvenuePDF = state => fromListings.getEvenuePDF(state.listings);

export const getPDFDownloaded = state =>
  fromListings.getPDFDownloaded(state.listings);

export const getOrderFullFillMent = state =>
  fromListings.getOrderFullFillMent(state.listings);

export const getSoldStatisticsLog = state =>
  fromListings.getSoldStatisticsLog(state.listings);

export const getPromos = state => fromPromos.getPromos(state.promos);

export const getEventPromos = state => fromPromos.getEventPromos(state.promos);

export const getGlobalConfigs = state =>
  fromGlobal.getGlobalConfigs(state.globals);

export const getGlobalsSessionConfig = state =>
  fromGlobal.getGlobalsSessionConfig(state.globals);

export const getGlobaltabConfigs = state =>
  fromGlobal.getGlobaltabConfigs(state.globals);

export const getShortTermLogs = state => fromLogs.getShortTermLogs(state.logs);

export const getEventsLog = state => fromLogs.getEventsLog(state.logs);

export const getEventLogDetails = state =>
  fromLogs.getEventLogDetails(state.logs);

export const getNearLogs = state => fromLogs.getNearLogs(state.logs);

export const getMediumTermLogs = state =>
  fromLogs.getMediumTermLogs(state.logs);

export const getLongTermLogs = state => fromLogs.getLongTermLogs(state.logs);

export const getDownLoadedInstanceLog = state =>
  fromLogs.getDownLoadedInstanceLog(state.logs);

export const getCloakListings = state =>
  fromListings.getCloakListings(state.listings);

export const getOrderStatusListings = state =>
  fromOrders.getOrderStatusListings(state.orders);

export const getEVenues = state => fromEVenues.getEVenues(state.eVenues);
export const getEventDetailsLog = state =>
  fromEvents.getEventDetailsLog(state.events);

export const getRePriceEventLog = state =>
  fromEvents.getRePriceEventLog(state.events);

export const getEmailManagement = state =>
  fromEmailManagement.getEmailManagement(state.emailManagement);

export const getViewLog = state => fromLogs.getViewLog(state.logs);

export const getPricePointList = state =>
  fromEvents.getPricePointList(state.events);

export const getSecondaryMargetList = state =>
  fromEvents.getSecondaryMargetList(state.events);

export const getFailedEventLog = state =>
  fromLogs.getFailedEventLog(state.logs);

export const getEventStatistic = state =>
  fromEventStatistic.getEventStatistic(state.eventStatistic);

export const getEventStatisticCount = state =>
  fromEventStatistic.getEventStatisticCount(state.eventStatistic);

export const getEventMonitor = state =>
  fromEventStatistic.getEventMonitor(state.eventStatistic);

export const getUnmatchedEventQueue = state =>
  fromEventStatistic.getUnmatchedEventQueue(state.eventStatistic);

export const getMisMatchedEventQueue = state =>
  fromEventStatistic.getMisMatchedEventQueue(state.eventStatistic);

export const getShowOnSaleEvents = state =>
  fromEventStatistic.getShowOnSaleEvents(state.eventStatistic);

export const getAvailablePromos = state =>
  fromPromos.getAvailablePromos(state.promos);

export const getEventAvailablePromoNames = state =>
  fromPromos.getEventAvailablePromoNames(state.promos);

export const getEvetsByPromoNames = state =>
  fromPromos.getEvetsByPromoNames(state.promos);

export const getBlacListInfo = state =>
  fromEvents.getBlacListInfo(state.events);
export const getAvailableOffers = state =>
  fromEvents.getAvailableOffers(state.events);

export const getSelectedEVenue = state =>
  fromEVenues.getSelectedEVenue(state.eVenues);

export const getClockTimer = state =>
  fromClockTimer.getClockTimer(state.clockTimers);

export const getEventsLogInfo = state => fromLogs.getEventsLogInfo(state.logs);

export const getAxsVenues = state =>
  fromAxsVenues.getAxsVenues(state.axsVenues);

export const getSearchAxsVenueData = state =>
  fromAxsVenues.getSearchAxsVenueData(state.axsVenues);

export const getSkyBoxAxsVenuesDup = state =>
  fromAxsVenues.getSkyBoxAxsVenuesDup(state.axsVenues);

export const getOtherVenues = state =>
  fromOtherVenues.getOtherVenues(state.otherVenues);

export const getSelectedOtherVenue = state =>
  fromOtherVenues.getSelectedOtherVenue(state.otherVenues);

// Duplicate events
export const getIsDuplicateEventsFetching = state =>
  fromApp.getIsDuplicateEventsFetching(state.app);

export const getDuplicateEventsQueue = state =>
  fromEvents.getDuplicateEventsQueue(state.events);

export const getIsDuplicateVenuesFetching = state =>
  fromApp.getIsDuplicateVenueFetching(state.app);

export const getDuplicateVenuesQueue = state =>
  fromVenues.getDuplicateVenues(state.venues);

// Sales Statistics

export const getSalesStatisticsLog = state =>
  fromListings.getSalesStatisticsLog(state.listings);

export const getIsSalesStatisticsFetching = state =>
  fromListings.getIsSalesStatisticsFetching(state.listings);

export const getIsRemonitorPresaleFetching = state =>
  fromApp.getIsRemonitorPresaleFetching(state.app);

export const getIsShowsOnSaleMatchedEventFetching = state =>
  fromApp.getIsShowsOnSaleMatchedEventFetching(state.app);

export const getSalesByMarketType = state =>
  fromListings.getSalesByMarketType(state.listings);

export const getIsSalesByMarketFetching = state =>
  fromListings.getIsSalesByMarketFetching(state.listings);

export const getSalesByVenue = state =>
  fromListings.getSalesByVenue(state.listings);

export const getIsSalesByVenueFetching = state =>
  fromListings.getIsSalesByVenueFetching(state.listings);

export const getEventsPerformers = state =>
  fromEvents.getEventsPerformers(state.events);

export const getSalesByHour = state =>
  fromListings.getSalesByHour(state.listings);

export const getIsSalesByHourFetching = state =>
  fromListings.getIsSalesByHourFetching(state.listings);

export const getSalesByPerformer = state =>
  fromListings.getSalesByPerformer(state.listings);

export const getIsSalesByPerformerFetching = state =>
  fromListings.getIsSalesByPerformerFetching(state.listings);

export const getIsFetchingSaleMarginHealthReport = state =>
  fromHealthReport.getIsFetchingSaleMarginHealthReport(state.healthReport);

export const getSaleMarginHealthReport = state =>
  fromHealthReport.getSaleMarginHealthReport(state.healthReport);

export const getIsFetchingMarketwiseSaleMarginHealthReport = state =>
  fromHealthReport.getIsFetchingMarketwiseSaleMarginHealthReport(
    state.healthReport
  );

export const getMarketwiseSaleMarginHealthReport = state =>
  fromHealthReport.getMarketwiseSaleMarginHealthReport(state.healthReport);

export const getIsFetchingSkyboxEventsHealthReport = state =>
  fromHealthReport.getIsFetchingSkyboxEventsHealthReport(state.healthReport);

export const getSkyboxEventsHealthReport = state =>
  fromHealthReport.getSkyboxEventsHealthReport(state.healthReport);

export const getIsFetchingSkyboxPostedPresaleEventsHealthReport = state =>
  fromHealthReport.getIsFetchingMarketwiseSaleMarginHealthReport(
    state.healthReport
  );
export const getSkyboxPostedPresaleEventsHealthReport = state =>
  fromHealthReport.getSkyboxPostedPresaleEventsHealthReport(state.healthReport);

export const getIsFetchingSkyboxPostedEventsHealthReport = state =>
  fromHealthReport.getIsFetchingSkyboxPostedEventsHealthReport(
    state.healthReport
  );

export const getSkyboxPostedEventsHealthReport = state =>
  fromHealthReport.getSkyboxPostedEventsHealthReport(state.healthReport);

export const getIsFetchingEventQueueHealthReport = state =>
  fromHealthReport.getIsFetchingEventQueueHealthReport(state.healthReport);

export const getEventQueueHealthReport = state =>
  fromHealthReport.getEventQueueHealthReport(state.healthReport);

export const getCancelledSkyboxEventsHealthReport = state =>
  fromHealthReport.getCancelledSkyboxEventsHealthReport(state.healthReport);

export const getIsFetchingCancelledSkyboxEventsHealthReport = state =>
  fromHealthReport.getIsFetchingCancelledSkyboxEventsHealthReport(
    state.healthReport
  );

export const getUpdateHealthReportConfig = state =>
  fromHealthReport.getUpdateHealthReportConfig(state.healthReport);

export const getIsFetchingUpdateHealthReportConfig = state =>
  fromHealthReport.getIsFetchingUpdateHealthReportConfig(state.healthReport);

export const getPresaleEventsHealthReport = state =>
  fromHealthReport.getPresaleEventsHealthReport(state.healthReport);

export const getIsFetchingPresaleEventsHealthReport = state =>
  fromHealthReport.getIsFetchingPresaleEventsHealthReport(state.healthReport);

export const getEventMonitoringHealthReport = state =>
  fromHealthReport.getEventMonitoringHealthReport(state.healthReport);

export const getIsFetchingShortEventMonitoringHealthReport = state =>
  fromHealthReport.getIsFetchingShortEventMonitoringHealthReport(
    state.healthReport
  );

export const getIsFetchingMediumEventMonitoringHealthReport = state =>
  fromHealthReport.getIsFetchingMediumEventMonitoringHealthReport(
    state.healthReport
  );

export const getIsFetchingLongEventMonitoringHealthReport = state =>
  fromHealthReport.getIsFetchingLongEventMonitoringHealthReport(
    state.healthReport
  );

export const getIsFetchingNearEventMonitoringHealthReport = state =>
  fromHealthReport.getIsFetchingNearEventMonitoringHealthReport(
    state.healthReport
  );

import { connect } from "react-redux";

import {
  getHasLoggedIn,
  getIsBroadcasting,
  getIsFetching,
  getIsResetPasswordFetching,
  getIsOrderFlowFetching,
  getOpenTransfersListings,
  getOpenSalesListings,
  getPurchasedTicketInfo,
  getUpcomingOpenOrders,
  getSimulateTrackedListing,
  getOrderFlowListings,
  getPDFAttachment,
  getGlobalConfigs,
  getCloakListings,
  getSoldStatisticsLog,
  getPDFDownloaded,
  getUserInfo,
  getClockTimer,
  getOrderFullFillMent,
  getEvenuePDF,
  getBroadCastUnbroadCastData,
  getSlipOrders,
  getUpComingOrder,
  getAllJockeyAccounts,
  getIsOpenOrderFetching,
  getIsSlipOrderFetching,
  getIsFetchingSaleMarginHealthReport,
  getSaleMarginHealthReport,
  getIsFetchingMarketwiseSaleMarginHealthReport,
  getMarketwiseSaleMarginHealthReport,
  getIsFetchingSkyboxEventsHealthReport,
  getSkyboxEventsHealthReport,
  getSkyboxPostedEventsHealthReport,
  getIsFetchingSkyboxPostedEventsHealthReport,
  getEventQueueHealthReport,
  getIsFetchingEventQueueHealthReport,
  getCancelledSkyboxEventsHealthReport,
  getIsFetchingCancelledSkyboxEventsHealthReport,
  getPresaleEventsHealthReport,
  getIsFetchingPresaleEventsHealthReport,
  getEventMonitoringHealthReport,
  getIsFetchingShortEventMonitoringHealthReport,
  getIsFetchingMediumEventMonitoringHealthReport,
  getIsFetchingNearEventMonitoringHealthReport,
  getIsFetchingLongEventMonitoringHealthReport
} from "../../reducers";
import {
  fetchBoradcastingStatus,
  setBoardCastingStatus,
  broadcastListingRequest
} from "../../actions/config";
import {
  fetchOpenSalesRequest,
  fetchOpenTransfersRequest,
  tryBuyAgainRequest,
  manualTransferRequest,
  fetchUserSummaryRequest,
  resetPurchasedTicketInfo,
  deleteListing,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  doneBuyingRequest,
  problemBuyingRequest,
  fetchUpcomingOpenOrdersRequest,
  fetchOpenListingsRequest,
  fetchSimulateTrackedListingsRequest,
  simulateSoldListingRequest,
  fetchOrderFlowRequest,
  fetchPDFAttachmentRequest,
  sendEmailRequest,
  fetchCloakListingRequest,
  fetchSoldStatisticsRequest,
  resetEmailPasswordRequest,
  fetchPDFDownlaodedRequest,
  updateEventTmOrderNumber,
  fetchOrderfullfillmentRequest,
  broadcastOrUnbroadcastEventForDaysRequest,
  fetchEvenuePDFRequest,
  fetchBroadcastOrUnbroadcastEventForDaysRequest,
  fetchSlipOrderRequest,
  fetchUpComingOrderRequest
} from "../../actions/listings";
import { fetchGlobalConfigRequest } from "../../actions/globalConfig";
import {
  fetchJockeyAccountsRequest,
  updateUserForBreakRequest
} from "../../actions/users";
import Dashboard from "./Dashboard";
import { saveSelectEvent, saveSelectedEventFrom } from "../../actions/tickets";
import { appReceiveAlert } from "../../actions/app";
import {
  fetchClockTimerRequest,
  createTimerRequest,
  clockInClockOutRequest
} from "../../actions/clockTime";
import { updateIsBlackListRequest } from "../../actions/events";
import {
  fetchSaleMarginHealthReportRequest,
  fetchMarketwiseSaleMarginHealthReportRequest,
  fetchSBEventsHealthReportRequest,
  fetchSBPostedEventsHealthReportRequest,
  fetchEventQueueHealthReportRequest,
  fetchCancelledSBEventsHealthReportRequest,
  fetchPresaleEventsHealthReportRequest,
  fetchEventMonitoringHealthReportRequest
} from "../../actions/healthReport";
// import { getEvenuePDF } from "../../reducers/listings"

const mapStateToProps = state => ({
  hasLoggedIn: getHasLoggedIn(state),
  isBroadcasting: getIsBroadcasting(state),
  isFetching: getIsFetching(state),
  isOrderFlowFetching: getIsOrderFlowFetching(state),
  isResetPasswordFetching: getIsResetPasswordFetching(state),
  openSaleslistings: getOpenSalesListings(state),
  openTransferslistings: getOpenTransfersListings(state),
  upcomingOpenOrders: getUpcomingOpenOrders(state),
  purchasedTicketInfo: getPurchasedTicketInfo(state),
  trackedListings: getSimulateTrackedListing(state),
  orderFlowListings: getOrderFlowListings(state),
  isOpenOrderFetching: getIsOpenOrderFetching(state),
  pdfAttachment: getPDFAttachment(state),
  pdfDownloaded: getPDFDownloaded(state),
  globals: getGlobalConfigs(state),
  cloakListings: getCloakListings(state),
  soldStatisticsLog: getSoldStatisticsLog(state),
  userInfo: getUserInfo(state),
  clockTimerList: getClockTimer(state),
  fullfillOrder: getOrderFullFillMent(state),
  evenuePDf: getEvenuePDF(state),
  getBroadCastUnbroadCastData: getBroadCastUnbroadCastData(state),
  slipOrders: getSlipOrders(state),
  upComingOrders: getUpComingOrder(state),
  allJockeyUsers: getAllJockeyAccounts(state),
  isSlipOrderFetching: getIsSlipOrderFetching(state),
  saleMarginHealthReport: getSaleMarginHealthReport(state),
  isSaleMarginFetching: getIsFetchingSaleMarginHealthReport(state),
  marketwiseSaleMarginHealthReport: getMarketwiseSaleMarginHealthReport(state),
  isMarketwiseSaleMarginFetching: getIsFetchingMarketwiseSaleMarginHealthReport(
    state
  ),
  skyboxEventsHealthReport: getSkyboxEventsHealthReport(state),
  isFetchingSkyboxEventsHealthReport: getIsFetchingSkyboxEventsHealthReport(
    state
  ),
  skyboxPostedEventsHealthReport: getSkyboxPostedEventsHealthReport(state),
  isFetchingSkyboxPostedEventsHealthReport: getIsFetchingSkyboxPostedEventsHealthReport(
    state
  ),
  eventQueueHealthReport: getEventQueueHealthReport(state),
  isFetchingEventQueueHealthReport: getIsFetchingEventQueueHealthReport(state),
  cancelledSkyboxEventsHealthReport: getCancelledSkyboxEventsHealthReport(
    state
  ),
  isFetchingCancelledSkyboxEventsHealthReport: getIsFetchingCancelledSkyboxEventsHealthReport(
    state
  ),
  presaleEventsHealthReport: getPresaleEventsHealthReport(state),
  isFetchingPresaleEventsHealthReport: getIsFetchingPresaleEventsHealthReport(
    state
  ),
  eventMonitoringHealthReport: getEventMonitoringHealthReport(state),
  isFetchingShortEventMonitoringHealthReport: getIsFetchingShortEventMonitoringHealthReport(
    state
  ),
  isFetchingMediumEventMonitoringHealthReport: getIsFetchingMediumEventMonitoringHealthReport(
    state
  ),
  isFetchingLongEventMonitoringHealthReport: getIsFetchingLongEventMonitoringHealthReport(
    state
  ),
  isFetchingNearEventMonitoringHealthReport: getIsFetchingNearEventMonitoringHealthReport(
    state
  )
});

const DashboardContainer = connect(mapStateToProps, {
  fetchBoradcastingStatus,
  setBoardCastingStatus,
  broadcastListingRequest,
  fetchOpenSalesRequest,
  fetchOpenTransfersRequest,
  tryBuyAgainRequest,
  manualTransferRequest,
  fetchUserSummaryRequest,
  resetPurchasedTicketInfo,
  deleteListing,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  problemBuyingRequest,
  doneBuyingRequest,
  fetchUpcomingOpenOrdersRequest,
  fetchOpenListingsRequest,
  fetchSimulateTrackedListingsRequest,
  simulateSoldListingRequest,
  fetchOrderFlowRequest,
  fetchPDFAttachmentRequest,
  sendEmailRequest,
  fetchGlobalConfigRequest,
  fetchCloakListingRequest,
  fetchSoldStatisticsRequest,
  resetEmailPasswordRequest,
  fetchPDFDownlaodedRequest,
  saveSelectEvent,
  saveSelectedEventFrom,
  appReceiveAlert,
  updateEventTmOrderNumber,
  fetchClockTimerRequest,
  createTimerRequest,
  fetchOrderfullfillmentRequest,
  fetchEvenuePDFRequest,
  broadcastOrUnbroadcastEventForDaysRequest,
  fetchBroadcastOrUnbroadcastEventForDaysRequest,
  fetchSlipOrderRequest,
  fetchUpComingOrderRequest,
  updateIsBlackListRequest,
  fetchJockeyAccountsRequest,
  clockInClockOutRequest,
  updateUserForBreakRequest,
  fetchSaleMarginHealthReportRequest,
  fetchMarketwiseSaleMarginHealthReportRequest,
  fetchSBEventsHealthReportRequest,
  fetchSBPostedEventsHealthReportRequest,
  fetchEventQueueHealthReportRequest,
  fetchCancelledSBEventsHealthReportRequest,
  fetchPresaleEventsHealthReportRequest,
  fetchEventMonitoringHealthReportRequest
})(Dashboard);

export default DashboardContainer;

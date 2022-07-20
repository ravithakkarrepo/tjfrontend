import { connect } from "react-redux";

import {
  fetchSaleMarginHealthReportRequest,
  fetchMarketwiseSaleMarginHealthReportRequest,
  fetchSBEventsHealthReportRequest,
  fetchSBPostedPresaleEventsHealthReportRequest,
  fetchSBPostedEventsHealthReportRequest,
  fetchEventQueueHealthReportRequest,
  fetchCancelledSBEventsHealthReportRequest,
  fetchUpdateHealthReportConfigRequest,
  fetchPresaleEventsHealthReportRequest,
  fetchEventMonitoringHealthReportRequest
} from "../../actions/healthReport";

import {
  getIsFetchingSaleMarginHealthReport,
  getSaleMarginHealthReport,
  getIsFetchingMarketwiseSaleMarginHealthReport,
  getMarketwiseSaleMarginHealthReport,
  getIsFetchingSkyboxEventsHealthReport,
  getSkyboxEventsHealthReport,
  getIsFetchingSkyboxPostedPresaleEventsHealthReport,
  getSkyboxPostedPresaleEventsHealthReport,
  getSkyboxPostedEventsHealthReport,
  getIsFetchingSkyboxPostedEventsHealthReport,
  getEventQueueHealthReport,
  getIsFetchingEventQueueHealthReport,
  getCancelledSkyboxEventsHealthReport,
  getIsFetchingCancelledSkyboxEventsHealthReport,
  getUpdateHealthReportConfig,
  getIsFetchingUpdateHealthReportConfig,
  getPresaleEventsHealthReport,
  getIsFetchingPresaleEventsHealthReport,
  getEventMonitoringHealthReport,
  getIsFetchingShortEventMonitoringHealthReport,
  getIsFetchingMediumEventMonitoringHealthReport,
  getIsFetchingNearEventMonitoringHealthReport,
  getIsFetchingLongEventMonitoringHealthReport,
  getGlobalConfigs
} from "../../reducers";
import HealthReport from "./HealthReport";

const HealthReportContainer = connect(
  state => ({
    saleMarginHealthReport: getSaleMarginHealthReport(state),
    isSaleMarginFetching: getIsFetchingSaleMarginHealthReport(state),
    marketwiseSaleMarginHealthReport: getMarketwiseSaleMarginHealthReport(
      state
    ),
    isMarketwiseSaleMarginFetching: getIsFetchingMarketwiseSaleMarginHealthReport(
      state
    ),
    skyboxEventsHealthReport: getSkyboxEventsHealthReport(state),
    isFetchingSkyboxEventsHealthReport: getIsFetchingSkyboxEventsHealthReport(
      state
    ),
    skyboxPostedPresaleEventsHealthReport: getSkyboxPostedPresaleEventsHealthReport(
      state
    ),
    isFetchingMarketwiseSaleMarginHealthReport: getIsFetchingMarketwiseSaleMarginHealthReport(
      state
    ),
    skyboxPostedEventsHealthReport: getSkyboxPostedEventsHealthReport(state),
    isFetchingSkyboxPostedEventsHealthReport: getIsFetchingSkyboxPostedEventsHealthReport(
      state
    ),
    eventQueueHealthReport: getEventQueueHealthReport(state),
    isFetchingEventQueueHealthReport: getIsFetchingEventQueueHealthReport(
      state
    ),
    cancelledSkyboxEventsHealthReport: getCancelledSkyboxEventsHealthReport(
      state
    ),
    isFetchingCancelledSkyboxEventsHealthReport: getIsFetchingCancelledSkyboxEventsHealthReport(
      state
    ),
    updateHealthReportConfig: getUpdateHealthReportConfig(state),
    isFetchingUpdateHealthReportConfig: getIsFetchingUpdateHealthReportConfig(
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
    ),
    globals: getGlobalConfigs(state)
  }),
  {
    fetchSaleMarginHealthReportRequest,
    fetchMarketwiseSaleMarginHealthReportRequest,
    fetchSBEventsHealthReportRequest,
    fetchSBPostedPresaleEventsHealthReportRequest,
    fetchSBPostedEventsHealthReportRequest,
    fetchEventQueueHealthReportRequest,
    fetchCancelledSBEventsHealthReportRequest,
    fetchUpdateHealthReportConfigRequest,
    fetchPresaleEventsHealthReportRequest,
    fetchEventMonitoringHealthReportRequest
  }
)(HealthReport);

export default HealthReportContainer;

import {
  FETCH_MARKETWISE_SALE_MARGIN_HEALTH_REPORT_REQUEST,
  FETCH_MARKETWISE_SALE_MARGIN_HEALTH_REPORT_SUCCESS,
  FETCH_SALE_MARGIN_HEALTH_REPORT_REQUEST,
  FETCH_SALE_MARGIN_HEALTH_REPORT_SUCCESS,
  FETCH_SB_EVENTS_HEALTH_REPORT_REQUEST,
  FETCH_SB_EVENTS_HEALTH_REPORT_SUCCESS,
  FETCH_SB_POSTED_PRESALE_EVENTS_HEALTH_REPORT_REQUEST,
  FETCH_SB_POSTED_PRESALE_EVENTS_HEALTH_REPORT_SUCCESS,
  FETCH_SB_POSTED_EVENTS_HEALTH_REPORT_REQUEST,
  FETCH_SB_POSTED_EVENTS_HEALTH_REPORT_SUCCESS,
  FETCH_EVENT_QUEUE_HEALTH_REPORT_REQUEST,
  FETCH_EVENT_QUEUE_HEALTH_REPORT_SUCCESS,
  FETCH_CANCELLED_SB_EVENTS_HEALTH_REPORT_REQUEST,
  FETCH_CANCELLED_SB_EVENTS_HEALTH_REPORT_SUCCESS,
  FETCH_UPDATE_HEALTH_REPORT_CONFIG_REQUEST,
  FETCH_UPDATE_HEALTH_REPORT_CONFIG_SUCCESS,
  FETCH_PRESALE_EVENTS_HEALTH_REPORT_REQUEST,
  FETCH_PRESALE_EVENTS_HEALTH_REPORT_SUCCESS,
  FETCH_EVENT_MONITORING_HEALTH_REPORT_REQUEST,
  FETCH_EVENT_MONITORING_HEALTH_REPORT_SUCCESS
} from "../actions/healthReport";

const healthReport = (
  state = {
    saleMargin: {},
    isFetchingSaleMarginHealthReport: false,
    saleMarginMarketwise: {},
    isFetchingMarketwiseSaleMarginHealthReport: false,
    skyboxEvents: {},
    isFetchingSkyboxEvents: false,
    skyboxPostedPresaleEvents: [],
    isFetchingSkyboxPostedPresaleEvents: false,
    skyboxPostedEvents: {
      shortMonitor: {},
      mediumMonitor: {},
      longMonitor: {},
      nearMonitor: {}
    },
    isFetchingSkyboxPostedEvents: false,
    eventQueue: {},
    isFetchingEventQueue: false,
    cancelledSkyboxEvents: {},
    isFetchingCancelledSkyboxEvents: false,
    healthReportConfig: {},
    isFetchingUpdateHealthReportConfig: false,
    presaleEvents: {},
    isFetchingPresaleEventsHealthReport: false,
    eventMonitoring: {
      short: {},
      medium: {},
      long: {},
      near: {}
    },
    isFetchingShortEventMonitoringHealthReport: false,
    isFetchingMediumEventMonitoringHealthReport: false,
    isFetchingLongEventMonitoringHealthReport: false,
    isFetchingNearEventMonitoringHealthReport: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_SALE_MARGIN_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingSaleMarginHealthReport: true
      };
    case FETCH_SALE_MARGIN_HEALTH_REPORT_SUCCESS:
      let { searchType, data } = action.payload;
      let obj = {
        ...state,
        isFetchingSaleMarginHealthReport: false
      };
      if (searchType === "sale") obj.saleMargin.sale = data;
      else if (searchType === "margin") obj.saleMargin.margin = data;
      else obj.saleMargin = data;
      return obj;
    case FETCH_MARKETWISE_SALE_MARGIN_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingMarketwiseSaleMarginHealthReport: true
      };
    case FETCH_MARKETWISE_SALE_MARGIN_HEALTH_REPORT_SUCCESS:
      let maekrtSearchType = action.payload.searchType;
      let marketData = action.payload.data;
      let stateObject = {
        ...state,
        isFetchingMarketwiseSaleMarginHealthReport: false
      };
      if (maekrtSearchType === "sale")
        stateObject.saleMarginMarketwise.sale = marketData;
      else if (maekrtSearchType === "margin")
        stateObject.saleMarginMarketwise.margin = marketData;
      else if (maekrtSearchType === "profit")
        stateObject.saleMarginMarketwise.profit = marketData;
      else stateObject.saleMarginMarketwise = marketData;
      return stateObject;
    case FETCH_SB_EVENTS_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingSkyboxEvents: true
      };
    case FETCH_SB_EVENTS_HEALTH_REPORT_SUCCESS:
      return {
        ...state,
        isFetchingSkyboxEvents: false,
        skyboxEvents: action.payload.data
      };
    case FETCH_SB_POSTED_EVENTS_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingSkyboxPostedEvents: true
      };
    case FETCH_SB_POSTED_EVENTS_HEALTH_REPORT_SUCCESS:
      let stateObj = {
        ...state,
        isFetchingSkyboxPostedEvents: false
      };
      switch (action.payload.monitorType) {
        case "short":
          stateObj.skyboxPostedEvents.shortMonitor = action.payload.data;
          break;
        case "medium":
          stateObj.skyboxPostedEvents.mediumMonitor = action.payload.data;
          break;
        case "near":
          stateObj.skyboxPostedEvents.nearMonitor = action.payload.data;
          break;
        case "long":
          stateObj.skyboxPostedEvents.longMonitor = action.payload.data;
          break;
        default:
          break;
      }
      return stateObj;
    case FETCH_SB_POSTED_PRESALE_EVENTS_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingSkyboxPostedPresaleEvents: true
      };
    case FETCH_SB_POSTED_PRESALE_EVENTS_HEALTH_REPORT_SUCCESS:
      return {
        ...state,
        isFetchingSkyboxPostedPresaleEvents: false,
        skyboxPostedPresaleEvents: action.payload.data
      };
    case FETCH_EVENT_QUEUE_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingEventQueue: true
      };
    case FETCH_EVENT_QUEUE_HEALTH_REPORT_SUCCESS:
      return {
        ...state,
        isFetchingEventQueue: false,
        eventQueue: action.payload.data
      };
    case FETCH_CANCELLED_SB_EVENTS_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingCancelledSkyboxEvents: true
      };
    case FETCH_CANCELLED_SB_EVENTS_HEALTH_REPORT_SUCCESS:
      return {
        ...state,
        isFetchingCancelledSkyboxEvents: false,
        cancelledSkyboxEvents: action.payload.data
      };
    case FETCH_UPDATE_HEALTH_REPORT_CONFIG_REQUEST:
      return {
        ...state,
        isFetchingUpdateHealthReportConfig: true
      };
    case FETCH_UPDATE_HEALTH_REPORT_CONFIG_SUCCESS:
      return {
        ...state,
        isFetchingUpdateHealthReportConfig: false,
        healthReportConfig: action.payload.data
      };
    case FETCH_PRESALE_EVENTS_HEALTH_REPORT_REQUEST:
      return {
        ...state,
        isFetchingPresaleEventsHealthReport: true
      };
    case FETCH_PRESALE_EVENTS_HEALTH_REPORT_SUCCESS:
      return {
        ...state,
        isFetchingPresaleEventsHealthReport: false,
        presaleEvents: action.payload.data
      };
    case FETCH_EVENT_MONITORING_HEALTH_REPORT_REQUEST:
      const term = action.payload.termName;
      let returnObj = {
        ...state
      };
      switch (term) {
        case "short":
          returnObj.isFetchingShortEventMonitoringHealthReport = true;
          break;
        case "near":
          returnObj.isFetchingMediumEventMonitoringHealthReport = true;
          break;
        case "medium":
          returnObj.isFetchingLongEventMonitoringHealthReport = true;
          break;
        case "long":
          returnObj.isFetchingNearEventMonitoringHealthReport = true;
          break;
        default:
          break;
      }
      return returnObj;
    case FETCH_EVENT_MONITORING_HEALTH_REPORT_SUCCESS:
      const termName = action.payload.data.termName;
      let eventObj = {
        ...state
      };
      switch (termName) {
        case "short":
          eventObj.eventMonitoring.short = action.payload.data;
          eventObj.isFetchingShortEventMonitoringHealthReport = false;
          break;
        case "near":
          eventObj.eventMonitoring.near = action.payload.data;
          eventObj.isFetchingMediumEventMonitoringHealthReport = false;
          break;
        case "medium":
          eventObj.eventMonitoring.medium = action.payload.data;
          eventObj.isFetchingLongEventMonitoringHealthReport = false;
          break;
        case "long":
          eventObj.eventMonitoring.long = action.payload.data;
          eventObj.isFetchingNearEventMonitoringHealthReport = false;
          break;
        default:
          break;
      }
      return eventObj;
    default:
      return state;
  }
};

export default healthReport;
export const getSaleMarginHealthReport = state => state.saleMargin;
export const getIsFetchingSaleMarginHealthReport = state =>
  state.isFetchingSaleMarginHealthReport;
export const getMarketwiseSaleMarginHealthReport = state =>
  state.saleMarginMarketwise;
export const getIsFetchingMarketwiseSaleMarginHealthReport = state =>
  state.isFetchingMarketwiseSaleMarginHealthReport;
export const getSkyboxEventsHealthReport = state => state.skyboxEvents;
export const getIsFetchingSkyboxEventsHealthReport = state =>
  state.isFetchingSkyboxEvents;
export const getSkyboxPostedPresaleEventsHealthReport = state =>
  state.skyboxPostedPresaleEvents;
export const getIsFetchingSkyboxPostedPresaleEventsHealthReport = state =>
  state.isFetchingSkyboxPostedPresaleEvents;
export const getSkyboxPostedEventsHealthReport = state =>
  state.skyboxPostedEvents;
export const getIsFetchingSkyboxPostedEventsHealthReport = state =>
  state.isFetchingSkyboxPostedEvents;
export const getEventQueueHealthReport = state => state.eventQueue;
export const getIsFetchingEventQueueHealthReport = state =>
  state.isFetchingEventQueue;
export const getCancelledSkyboxEventsHealthReport = state =>
  state.cancelledSkyboxEvents;
export const getIsFetchingCancelledSkyboxEventsHealthReport = state =>
  state.isFetchingCancelledSkyboxEvents;
export const getUpdateHealthReportConfig = state => state.healthReportConfig;
export const getIsFetchingUpdateHealthReportConfig = state =>
  state.isFetchingUpdateHealthReportConfig;
export const getPresaleEventsHealthReport = state => state.presaleEvents;
export const getIsFetchingPresaleEventsHealthReport = state =>
  state.isFetchingPresaleEventsHealthReport;

export const getEventMonitoringHealthReport = state => state.eventMonitoring;
export const getIsFetchingShortEventMonitoringHealthReport = state =>
  state.isFetchingEventMonitoringHealthReport;
export const getIsFetchingMediumEventMonitoringHealthReport = state =>
  state.isFetchingEventMonitoringHealthReport;
export const getIsFetchingLongEventMonitoringHealthReport = state =>
  state.isFetchingEventMonitoringHealthReport;
export const getIsFetchingNearEventMonitoringHealthReport = state =>
  state.isFetchingEventMonitoringHealthReport;

import { connect } from "react-redux";

import {
  fetchSalesStatisticsRequest,
  fetchSalesByMarketRequest,
  fetchSalesByVenueRequest,
  fetchSalesByHourRequest,
  fetchSalesByPerformerRequest
} from "../../actions/listings";

import {
  getIsSalesStatisticsFetching,
  getSalesStatisticsLog,
  getGlobalConfigs,
  getSalesByMarketType,
  getSalesByVenue,
  getSalesByHour,
  getSalesByPerformer,
  getIsSalesByMarketFetching,
  getIsSalesByVenueFetching,
  getIsSalesByHourFetching,
  getIsSalesByPerformerFetching
} from "../../reducers";
import SalesStatistics from "./SalesStatistics";

const SalesStatisticsContainer = connect(
  state => ({
    salesStatisticsLog: getSalesStatisticsLog(state),
    salesByMarketType: getSalesByMarketType(state),
    salesByVenue: getSalesByVenue(state),
    salesByHour: getSalesByHour(state),
    salesByPerformer: getSalesByPerformer(state),
    isFetching: getIsSalesStatisticsFetching(state),
    isSalesByMarketFetching: getIsSalesByMarketFetching(state),
    isSalesByVenueFetching: getIsSalesByVenueFetching(state),
    isSalesByHourFetching: getIsSalesByHourFetching(state),
    isSalesByPerformerFetching: getIsSalesByPerformerFetching(state),
    globals: getGlobalConfigs(state)
  }),
  {
    fetchSalesStatisticsRequest,
    fetchSalesByMarketRequest,
    fetchSalesByVenueRequest,
    fetchSalesByHourRequest,
    fetchSalesByPerformerRequest
  }
)(SalesStatistics);

export default SalesStatisticsContainer;

import { connect } from "react-redux";

import {
  fetchPromosRequest,
  deletePromosRequest,
  addPromoRequest,
  deleteEventPromosFromPromotionRequest,
  addEventPromoRequest,
  fetchEventPromosRequest,
  fetchAvailableEventPromosRequest,
  fetchEventsByPromoNameRequest,
  deleteEventPromosFromAddPromoRequest
} from "../../actions/promos";
import {
  getPromos,
  getEventPromos,
  getAvailablePromos,
  getEventPromosFetching,
  getIsFetching,
  getEvetsByPromoNames,
  getIsEventsByPromoFetching
} from "../../reducers";
import Promos from "./Promos";
import { appReceiveAlert } from "../../actions/app";

const PromosContainer = connect(
  state => ({
    isFetching: getIsFetching(state),
    isEventsByPromoFetching: getIsEventsByPromoFetching(state),
    promos: getPromos(state),
    eventPromos: getEventPromos(state),
    availablePromos: getAvailablePromos(state),
    eventPromosFetching: getEventPromosFetching(state),
    events: getEvetsByPromoNames(state)
  }),
  {
    fetchPromosRequest,
    deletePromosRequest,
    addPromoRequest,
    deleteEventPromosFromPromotionRequest,
    addEventPromoRequest,
    fetchEventPromosRequest,
    appReceiveAlert,
    fetchAvailableEventPromosRequest,
    fetchEventsByPromoNameRequest,
    deleteEventPromosFromAddPromoRequest
  }
)(Promos);

export default PromosContainer;

import { connect } from "react-redux";

import OtherVenues from "./OtherVenues";
import {
  fetchOtherVenuesRequest,
  deleteOtherVenueRequest,
  updateOtherVenueRequest,
  createOtherVenueRequest,
  updateIsBlackListOtherVenueRequest,
  setSelectedOtherVenue
} from "../../actions/otherVenues";
import {
  getOtherVenues,
  getIsFetching,
  getErrorMsg,
  getGlobalConfigs
} from "../../reducers";
import { appReceiveAlert } from "../../actions/app";

const OtherVenuesContainer = connect(
  state => ({
    othervenues: getOtherVenues(state),
    globals: getGlobalConfigs(state),
    isFetching: getIsFetching(state),
    errorMsg: getErrorMsg(state)
  }),
  {
    fetchOtherVenuesRequest,
    deleteOtherVenueRequest,
    updateOtherVenueRequest,
    createOtherVenueRequest,
    updateIsBlackListOtherVenueRequest,
    appReceiveAlert,
    setSelectedOtherVenue
  }
)(OtherVenues);

export default OtherVenuesContainer;

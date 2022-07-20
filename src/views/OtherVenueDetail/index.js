import { connect } from "react-redux";

import {
  fetchEmailManagementRequest,
  deleteEmailManagementRequest,
  updateEmailManagementRequest,
  createEmailManagementRequest
} from "../../actions/emailManagement";

import { updatePriceMarkUpPctForVenueRequest } from "../../actions/venues";

import { resetEmailPasswordRequest } from "../../actions/listings";
import {
  getEmailManagement,
  getIsFetching,
  getErrorMsg,
  getIsResetPasswordFetching,
  getSelectedOtherVenue
} from "../../reducers";

import { appReceiveAlert } from "../../actions/app";

import OtherVenueDetail from "./OtherVenueDetail";

const OtherVenueDetailContainer = connect(
  state => ({
    emailManagements: getEmailManagement(state),
    isFetching: getIsFetching(state),
    errorMsg: getErrorMsg(state),
    isResetPasswordFetching: getIsResetPasswordFetching(state),
    selectedOtherVenue: getSelectedOtherVenue(state)
  }),
  {
    fetchEmailManagementRequest,
    deleteEmailManagementRequest,
    updateEmailManagementRequest,
    createEmailManagementRequest,
    resetEmailPasswordRequest,
    updatePriceMarkUpPctForVenueRequest,
    appReceiveAlert
  }
)(OtherVenueDetail);

export default OtherVenueDetailContainer;

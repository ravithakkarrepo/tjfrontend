import { connect } from "react-redux";

import AxsVenues from "./AxsVenues";
import {
  fetchAxsVenueRequest,
  deleteAxsVenueRequest,
  updateAxsVenueRequest,
  fetchAxsVenuePagingRequest,
  searchSkyboxAxsVenueRequest,
  closeModalSkyBoxAxsVenue,
  selectSkyboxAxsVenue,
  closeSkyboxAxsVenueModal,
  clearAxsVenues,
  fetchAxsVenueSearchRequest
} from "../../actions/axsVenues";
import {
  getAxsVenues,
  getSearchAxsVenueData,
  getSkyBoxAxsVenuesDup,
  getIsFetching
} from "../../reducers";

const AxsVenuesContainer = connect(
  state => ({
    axsVenues: getAxsVenues(state),
    searchAxsVenueData: getSearchAxsVenueData(state),
    skyBoxAxsVenuesDup: getSkyBoxAxsVenuesDup(state),
    isFetching: getIsFetching(state)
  }),
  {
    fetchAxsVenueRequest,
    deleteAxsVenueRequest,
    updateAxsVenueRequest,
    fetchAxsVenuePagingRequest,
    searchSkyboxAxsVenueRequest,
    closeModalSkyBoxAxsVenue,
    selectSkyboxAxsVenue,
    closeSkyboxAxsVenueModal,
    clearAxsVenues,
    fetchAxsVenueSearchRequest
  }
)(AxsVenues);

export default AxsVenuesContainer;

import { connect } from "react-redux";

import ManagedVenue from "./ManagedVenue";
import {
  fetchManagedVenueRequest,
  deleteManagedVenueRequest,
  updateManagedVenueRequest,
  fetchManagedVenuePagingRequest,
  searchSkyboxVenueRequest,
  closeModalSkyBoxVenue,
  selectSkyboxVenue,
  closeSkyboxVenueModal,
  clearManagedVenues,
  fetchManagedVenueSearchRequest,
  searchVenueRequest,
  searchVenueInSkyBoxRequest,
  updateVenueIsBlackListRequest,
  updatePriceMarkUpPctForVenueRequest,
  bulkUpdatePriceLETRequest
} from "../../actions/venues";
import {
  getManagedVenues,
  getSearchVenueData,
  getSkyBoxVenuesDup,
  getisCalledFromCreateVenue,
  getIsFetching,
  getSearchManagedVenue,
  getSearchVenueInSkyBox
} from "../../reducers";
import { appReceiveAlert } from "../../actions/app";

const ManagedVenueContainer = connect(
  state => ({
    managedVenues: getManagedVenues(state),
    searchVenueData: getSearchVenueData(state),
    skyBoxVenuesDup: getSkyBoxVenuesDup(state),
    isCalledFromCreateVenue: getisCalledFromCreateVenue(state),
    isFetching: getIsFetching(state),
    searchTmManagedVenue: getSearchManagedVenue(state),
    searchVenueInSkyBox: getSearchVenueInSkyBox(state)
  }),
  {
    fetchManagedVenueRequest,
    deleteManagedVenueRequest,
    updateManagedVenueRequest,
    fetchManagedVenuePagingRequest,
    searchSkyboxVenueRequest,
    closeModalSkyBoxVenue,
    selectSkyboxVenue,
    closeSkyboxVenueModal,
    clearManagedVenues,
    fetchManagedVenueSearchRequest,
    searchVenueRequest,
    searchVenueInSkyBoxRequest,
    appReceiveAlert,
    updateVenueIsBlackListRequest,
    updatePriceMarkUpPctForVenueRequest,
    bulkUpdatePriceLETRequest
  }
)(ManagedVenue);

export default ManagedVenueContainer;
